import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsArray} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsArray()
  @IsDateString({}, {each: true})
  expiryDates?: string[];

  @IsOptional()
  @IsString()
  comment?: string;
}
