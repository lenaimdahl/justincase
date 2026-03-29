import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AdjustQuantityDto} from 'src/dtos/adjust-quantity.dto';
import {CreateItemDto} from 'src/dtos/create-item.dto';
import {UpdateItemDto} from 'src/dtos/update-item.dto';
import {ItemsService} from 'src/modules/items/items.service';

@Controller('api/lists/:id/items')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(@Param('id') listId: string) {
    const result = await this.itemsService.findAll(listId);
    this.logger.debug(`GET /lists/${listId}/items -> 200 OK (${result.length} items)`);
    return result;
  }

  @Post()
  async create(@Param('id') listId: string, @Body() dto: CreateItemDto) {
    const result = await this.itemsService.create(listId, dto);
    this.logger.debug(`POST /lists/${listId}/items -> 201 Created (id: ${result._id})`);
    return result;
  }

  @Patch(':itemId')
  async update(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: UpdateItemDto) {
    const result = await this.itemsService.update(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId} -> 200 OK`);
    return result;
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') listId: string, @Param('itemId') itemId: string) {
    await this.itemsService.remove(listId, itemId);
    this.logger.debug(`DELETE /lists/${listId}/items/${itemId} -> 204 No Content`);
  }

  @Patch(':itemId/adjust')
  async adjustQuantity(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: AdjustQuantityDto) {
    const result = await this.itemsService.adjustQuantity(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId}/adjust -> 200 OK`);
    return result;
  }
}
