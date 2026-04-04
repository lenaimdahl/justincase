import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import type {FieldConfig} from 'src/dtos/create-list.dto';

export class UpdateListDto {
  @ApiPropertyOptional({example: 'Groceries'})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({example: '🛒'})
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({example: '#9c27b0'})
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fieldConfig?: FieldConfig;
}
