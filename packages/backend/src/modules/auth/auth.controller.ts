import {Body, Controller, Get, HttpCode, Logger, Post, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Throttle} from '@nestjs/throttler';
import {AuthService} from 'src/modules/auth/auth.service';
import {CurrentUser} from 'src/modules/auth/decorators/current-user.decorator';
import {Public} from 'src/modules/auth/decorators/public.decorator';
import {LoginDto} from 'src/modules/auth/dtos/login.dto';
import {RegisterDto} from 'src/modules/auth/dtos/register.dto';
import {GoogleAuthGuard} from 'src/modules/auth/guards/google-auth.guard';
import {LocalAuthGuard} from 'src/modules/auth/guards/local-auth.guard';
import type {UserDocument} from 'src/modules/users/schemas/user.schema';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({default: {limit: 5, ttl: 60000}})
  @ApiOperation({summary: 'Register a new user'})
  @ApiResponse({status: 201, description: 'User registered, returns JWT token'})
  @ApiResponse({status: 409, description: 'Email already in use'})
  async register(@Body() dto: RegisterDto) {
    this.logger.debug(`POST /api/auth/register`);
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @Throttle({default: {limit: 10, ttl: 60000}})
  @ApiOperation({summary: 'Login with email and password'})
  @ApiResponse({status: 200, description: 'Returns JWT token'})
  @ApiResponse({status: 401, description: 'Invalid credentials'})
  async login(@CurrentUser() user: UserDocument, @Body() loginDto: LoginDto) {
    this.logger.debug(`POST /api/auth/login -> user ${user.email} (email: ${loginDto.email})`);
    return this.authService.login(user);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Logout the current user'})
  @ApiResponse({status: 200, description: 'Logged out successfully'})
  async logout(@CurrentUser() user: UserDocument) {
    this.logger.debug(`POST /api/auth/logout -> user ${user.email}`);
    await this.authService.logout(String(user._id));
    return {message: 'Logged out successfully'};
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get the current user profile'})
  @ApiResponse({status: 200, description: 'Current user profile'})
  getProfile(@CurrentUser() user: UserDocument) {
    this.logger.debug(`GET /api/auth/me -> user ${user.email}`);
    return this.authService.getProfile(user);
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Initiate Google OAuth login'})
  @ApiResponse({status: 302, description: 'Redirects to Google OAuth'})
  googleLogin() {
    // Initiates Google OAuth flow
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({summary: 'Google OAuth callback'})
  @ApiResponse({status: 200, description: 'Returns JWT token'})
  async googleCallback(@Req() req: {user: UserDocument}) {
    this.logger.debug(`GET /api/auth/google/callback`);
    return this.authService.login(req.user);
  }
}
