import type {UserDocument} from 'src/modules/users/schemas/user.schema';

import {Body, Controller, Get, HttpCode, Logger, Post, Req, UseGuards} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Throttle} from '@nestjs/throttler';
import {AuthService} from 'src/modules/auth/auth.service';
import {CurrentUser} from 'src/modules/auth/decorators/current-user.decorator';
import {Public} from 'src/modules/auth/decorators/public.decorator';
import {LoginDto} from 'src/modules/auth/dtos/login.dto';
import {RegisterDto} from 'src/modules/auth/dtos/register.dto';
import {GoogleAuthGuard} from 'src/modules/auth/guards/google-auth.guard';
import {LocalAuthGuard} from 'src/modules/auth/guards/local-auth.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {}

  @ApiOperation({summary: 'Get auth configuration (e.g. whether Google OAuth is enabled)'})
  @ApiResponse({description: 'Auth configuration', status: 200})
  @Get('config')
  @Public()
  getConfig() {
    this.logger.debug(`GET /api/auth/config`);
    return {googleOAuthEnabled: !!this.config.get<string>('GOOGLE_CLIENT_ID')};
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get the current user profile'})
  @ApiResponse({description: 'Current user profile', status: 200})
  @Get('me')
  getProfile(@CurrentUser() user: UserDocument) {
    this.logger.debug(`GET /api/auth/me -> user ${user.email}`);
    return this.authService.getProfile(user);
  }

  @ApiOperation({summary: 'Google OAuth callback'})
  @ApiResponse({description: 'Returns JWT token', status: 200})
  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: {user: UserDocument}) {
    this.logger.debug(`GET /api/auth/google/callback`);
    return this.authService.login(req.user);
  }

  @ApiOperation({summary: 'Initiate Google OAuth login'})
  @ApiResponse({description: 'Redirects to Google OAuth', status: 302})
  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Initiates Google OAuth flow
  }

  @ApiOperation({summary: 'Login with email and password'})
  @ApiResponse({description: 'Returns JWT token', status: 200})
  @ApiResponse({description: 'Invalid credentials', status: 401})
  @HttpCode(200)
  @Post('login')
  @Public()
  @Throttle({default: {limit: 10, ttl: 60000}})
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: UserDocument, @Body() loginDto: LoginDto) {
    this.logger.debug(`POST /api/auth/login -> user ${user.email} (email: ${loginDto.email})`);
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Logout the current user'})
  @ApiResponse({description: 'Logged out successfully', status: 200})
  @HttpCode(200)
  @Post('logout')
  async logout(@CurrentUser() user: UserDocument) {
    this.logger.debug(`POST /api/auth/logout -> user ${user.email}`);
    await this.authService.logout(String(user._id));
    return {message: 'Logged out successfully'};
  }

  @ApiOperation({summary: 'Register a new user'})
  @ApiResponse({description: 'User registered, returns JWT token', status: 201})
  @ApiResponse({description: 'Email already in use', status: 409})
  @Post('register')
  @Public()
  @Throttle({default: {limit: 5, ttl: 60000}})
  async register(@Body() dto: RegisterDto) {
    this.logger.debug(`POST /api/auth/register`);
    return this.authService.register(dto);
  }
}
