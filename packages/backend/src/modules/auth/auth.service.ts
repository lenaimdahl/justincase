import {ConflictException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {JwtPayload} from 'src/modules/auth/dtos/jwt-payload.dto';
import {RegisterDto} from 'src/modules/auth/dtos/register.dto';
import {UserDocument} from 'src/modules/users/schemas/user.schema';
import {UsersService} from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.passwordHash) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? user : null;
  }

  async login(user: UserDocument): Promise<{accessToken: string}> {
    const payload: JwtPayload = {
      sub: String(user._id),
      email: user.email,
      tokenVersion: user.tokenVersion,
    };
    this.logger.debug(`Logging in user ${user.email}`);
    return {accessToken: this.jwtService.sign(payload)};
  }

  async register(dto: RegisterDto): Promise<{accessToken: string}> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash,
      username: dto.username,
    });
    this.logger.debug(`Registered new user ${dto.email}`);
    return this.login(user);
  }

  async logout(userId: string): Promise<void> {
    this.logger.debug(`Logging out user ${userId}`);
    await this.usersService.incrementTokenVersion(userId);
  }

  async findOrCreateGoogleUser(googleId: string, email: string): Promise<UserDocument> {
    let user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      user = await this.usersService.findByEmail(email);
      if (user) {
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
      } else {
        user = await this.usersService.create({email, googleId});
      }
    }
    return user;
  }

  async findOrCreateAppleUser(appleId: string, email: string): Promise<UserDocument> {
    let user = await this.usersService.findByAppleId(appleId);
    if (!user) {
      user = await this.usersService.findByEmail(email);
      if (user) {
        if (!user.appleId) {
          user.appleId = appleId;
          await user.save();
        }
      } else {
        user = await this.usersService.create({email, appleId});
      }
    }
    return user;
  }

  getProfile(user: UserDocument): {email: string; id: string; username?: string} {
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
      id: String(user._id),
      username: user.username,
    };
  }
}
