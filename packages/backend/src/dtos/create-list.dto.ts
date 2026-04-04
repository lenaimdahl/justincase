import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export interface FieldConfig {
  checkboxLabels?: string[];
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
}

export class CreateListDto {
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

  @ApiProperty({example: 'Groceries'})
  @IsNotEmpty()
  @IsString()
  name!: string;
}
