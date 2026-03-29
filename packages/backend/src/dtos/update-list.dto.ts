import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import type {FieldConfig} from 'src/dtos/create-list.dto';

export class UpdateListDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsOptional()
  fieldConfig?: FieldConfig;
}
