import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdjustQuantityDto } from 'src/dtos/adjust-quantity.dto';
import { CreateItemDto } from 'src/dtos/create-item.dto';
import { UpdateItemDto } from 'src/dtos/update-item.dto';
import { ItemsService } from 'src/modules/items/items.service';

@Controller('lists/:id/items')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Param('id') listId: string, @Body() dto: CreateItemDto) {
    return this.itemsService.create(listId, dto);
  }

  @Patch(':itemId')
  update(
    @Param('id') listId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.itemsService.update(listId, itemId, dto);
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') listId: string, @Param('itemId') itemId: string) {
    return this.itemsService.remove(listId, itemId);
  }

  @Patch(':itemId/adjust')
  adjustQuantity(
    @Param('id') listId: string,
    @Param('itemId') itemId: string,
    @Body() dto: AdjustQuantityDto,
  ) {
    return this.itemsService.adjustQuantity(listId, itemId, dto);
  }
}
