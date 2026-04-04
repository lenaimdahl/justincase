import {IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export interface FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export class CreateListDto {
  @ApiProperty({example: 'Groceries'})
  @IsString()
  @IsNotEmpty()
  name!: string;

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
