import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({example: 'Buy organic'})
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({example: '2025-12-31'})
  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @ApiPropertyOptional({example: ['2025-12-31', '2026-01-15'], type: [String]})
  @IsArray()
  @IsDateString({}, {each: true})
  @IsOptional()
  expiryDates?: string[];

  @ApiPropertyOptional({example: 'Milk'})
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({example: 2, minimum: 0})
  @IsNumber()
  @IsOptional()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({example: 'liters'})
  @IsOptional()
  @IsString()
  unit?: string;
}
