import {IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray} from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsOptional()
  fieldConfig?: FieldConfig;
}
