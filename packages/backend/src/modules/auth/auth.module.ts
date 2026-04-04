import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from 'src/modules/auth/auth.controller';
import {AuthService} from 'src/modules/auth/auth.service';
import {GoogleStrategy} from 'src/modules/auth/strategies/google.strategy';
import {JwtStrategy} from 'src/modules/auth/strategies/jwt.strategy';
import {LocalStrategy} from 'src/modules/auth/strategies/local.strategy';
import {UsersModule} from 'src/modules/users/users.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {expiresIn: '7d'},
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...(process.env['GOOGLE_CLIENT_ID'] ? [GoogleStrategy] : [])],
})
export class AuthModule {}
