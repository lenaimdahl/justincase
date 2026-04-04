import {IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  comment?: string;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @IsArray()
  @IsDateString({}, {each: true})
  @IsOptional()
  expiryDates?: string[];

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;
}
