import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsNumber} from 'class-validator';

export class AdjustQuantityDto {
  @ApiProperty({description: 'Amount to adjust quantity by (can be negative)', example: 1})
  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  adjustment!: number;
}
