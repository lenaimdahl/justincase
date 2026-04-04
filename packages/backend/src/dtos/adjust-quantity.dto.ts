import {IsInt, IsNotEmpty, IsNumber} from 'class-validator';

export class AdjustQuantityDto {
  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  adjustment!: number;
}
