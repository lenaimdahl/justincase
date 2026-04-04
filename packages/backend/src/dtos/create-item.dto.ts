import {IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class CreateItemDto {
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
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsOptional()
  @IsString()
  unit?: string;
}
