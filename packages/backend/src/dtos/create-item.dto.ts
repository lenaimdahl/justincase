import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class CreateItemDto {
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
}
