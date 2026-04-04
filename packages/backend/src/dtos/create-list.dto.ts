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
  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  fieldConfig?: FieldConfig;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
