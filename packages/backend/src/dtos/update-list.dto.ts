import type {FieldConfig} from 'src/dtos/create-list.dto';

import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  fieldConfig?: FieldConfig;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;
}
