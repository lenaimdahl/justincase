import type {FieldConfig} from 'src/dtos/create-list.dto';

import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateListDto {
  @ApiPropertyOptional({example: '#9c27b0'})
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fieldConfig?: FieldConfig;

  @ApiPropertyOptional({example: '🛒'})
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({example: 'Groceries'})
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;
}
