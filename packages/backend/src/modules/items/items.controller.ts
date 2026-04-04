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
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AdjustQuantityDto} from 'src/dtos/adjust-quantity.dto';
import {CreateItemDto} from 'src/dtos/create-item.dto';
import {UpdateItemDto} from 'src/dtos/update-item.dto';
import {ItemsService} from 'src/modules/items/items.service';

@ApiBearerAuth()
@ApiTags('items')
@Controller('api/lists/:id/items')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({summary: 'Adjust item quantity'})
  @ApiResponse({description: 'Updated item', status: 200})
  @ApiResponse({description: 'Item not found', status: 404})
  @Patch(':itemId/adjust')
  async adjustQuantity(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: AdjustQuantityDto) {
    const result = await this.itemsService.adjustQuantity(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId}/adjust -> 200 OK`);
    return result;
  }

  @ApiOperation({summary: 'Create a new item in a list'})
  @ApiResponse({description: 'Item created', status: 201})
  @Post()
  async create(@Param('id') listId: string, @Body() dto: CreateItemDto) {
    const result = await this.itemsService.create(listId, dto);
    this.logger.debug(`POST /lists/${listId}/items -> 201 Created (id: ${result._id})`);
    return result;
  }

  @ApiOperation({summary: 'Get all items in a list'})
  @ApiResponse({description: 'List of items', status: 200})
  @Get()
  async findAll(@Param('id') listId: string) {
    const result = await this.itemsService.findAll(listId);
    this.logger.debug(`GET /lists/${listId}/items -> 200 OK (${result.length} items)`);
    return result;
  }

  @ApiOperation({summary: 'Delete an item'})
  @ApiResponse({description: 'Item deleted', status: 204})
  @ApiResponse({description: 'Item not found', status: 404})
  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') listId: string, @Param('itemId') itemId: string) {
    await this.itemsService.remove(listId, itemId);
    this.logger.debug(`DELETE /lists/${listId}/items/${itemId} -> 204 No Content`);
  }

  @ApiOperation({summary: 'Update an item'})
  @ApiResponse({description: 'Updated item', status: 200})
  @ApiResponse({description: 'Item not found', status: 404})
  @Patch(':itemId')
  async update(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: UpdateItemDto) {
    const result = await this.itemsService.update(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId} -> 200 OK`);
    return result;
  }
}
