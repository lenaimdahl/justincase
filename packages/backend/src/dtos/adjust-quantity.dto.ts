import {IsInt, IsNotEmpty, IsNumber} from 'class-validator';

export class AdjustQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  adjustment!: number;
}
