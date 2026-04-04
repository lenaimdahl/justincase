import {Body, Controller, Get, HttpCode, Logger, Post, Req, UseGuards} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Throttle} from '@nestjs/throttler';
import {AuthService} from 'src/modules/auth/auth.service';
import {CurrentUser} from 'src/modules/auth/decorators/current-user.decorator';
import {Public} from 'src/modules/auth/decorators/public.decorator';
import {LoginDto} from 'src/modules/auth/dtos/login.dto';
import {RegisterDto} from 'src/modules/auth/dtos/register.dto';
import {GoogleAuthGuard} from 'src/modules/auth/guards/google-auth.guard';
import {LocalAuthGuard} from 'src/modules/auth/guards/local-auth.guard';
import type {UserDocument} from 'src/modules/users/schemas/user.schema';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {}

  @Public()
  @Post('register')
  @Throttle({default: {limit: 5, ttl: 60000}})
  async register(@Body() dto: RegisterDto) {
    this.logger.debug(`POST /api/auth/register`);
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @Throttle({default: {limit: 10, ttl: 60000}})
  async login(@CurrentUser() user: UserDocument, @Body() loginDto: LoginDto) {
    this.logger.debug(`POST /api/auth/login -> user ${user.email} (email: ${loginDto.email})`);
    return this.authService.login(user);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@CurrentUser() user: UserDocument) {
    this.logger.debug(`POST /api/auth/logout -> user ${user.email}`);
    await this.authService.logout(String(user._id));
    return {message: 'Logged out successfully'};
  }

  @Get('me')
  getProfile(@CurrentUser() user: UserDocument) {
    this.logger.debug(`GET /api/auth/me -> user ${user.email}`);
    return this.authService.getProfile(user);
  }

  @Public()
  @Get('config')
  getConfig() {
    this.logger.debug(`GET /api/auth/config`);
    return {googleOAuthEnabled: !!this.config.get<string>('GOOGLE_CLIENT_ID')};
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Initiates Google OAuth flow
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: {user: UserDocument}) {
    this.logger.debug(`GET /api/auth/google/callback`);
    return this.authService.login(req.user);
  }
}
