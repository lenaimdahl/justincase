import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsArray} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({example: 'Milk'})
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({example: 1, minimum: 0})
  @IsNumber()
  @Min(0)
  quantity!: number;

  @ApiPropertyOptional({example: 'liters'})
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({example: '2025-12-31'})
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({example: ['2025-12-31', '2026-01-15'], type: [String]})
  @IsOptional()
  @IsArray()
  @IsDateString({}, {each: true})
  expiryDates?: string[];

  @ApiPropertyOptional({example: 'Buy organic'})
  @IsOptional()
  @IsString()
  comment?: string;
}
