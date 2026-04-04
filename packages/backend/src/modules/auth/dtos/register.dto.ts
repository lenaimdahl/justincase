import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({example: 'user@example.com'})
  @IsEmail()
  email!: string;

  @ApiProperty({example: 'password123', minLength: 8})
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({example: 'johndoe'})
  @IsString()
  @IsOptional()
  username?: string;
}
