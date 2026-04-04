import {IsInt, IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class AdjustQuantityDto {
  @ApiProperty({example: 1, description: 'Amount to adjust quantity by (can be negative)'})
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  adjustment!: number;
}
