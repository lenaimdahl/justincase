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

@ApiTags('items')
@ApiBearerAuth()
@Controller('api/lists/:id/items')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({summary: 'Get all items in a list'})
  @ApiResponse({status: 200, description: 'List of items'})
  async findAll(@Param('id') listId: string) {
    const result = await this.itemsService.findAll(listId);
    this.logger.debug(`GET /lists/${listId}/items -> 200 OK (${result.length} items)`);
    return result;
  }

  @Post()
  @ApiOperation({summary: 'Create a new item in a list'})
  @ApiResponse({status: 201, description: 'Item created'})
  async create(@Param('id') listId: string, @Body() dto: CreateItemDto) {
    const result = await this.itemsService.create(listId, dto);
    this.logger.debug(`POST /lists/${listId}/items -> 201 Created (id: ${result._id})`);
    return result;
  }

  @Patch(':itemId')
  @ApiOperation({summary: 'Update an item'})
  @ApiResponse({status: 200, description: 'Updated item'})
  @ApiResponse({status: 404, description: 'Item not found'})
  async update(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: UpdateItemDto) {
    const result = await this.itemsService.update(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId} -> 200 OK`);
    return result;
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Delete an item'})
  @ApiResponse({status: 204, description: 'Item deleted'})
  @ApiResponse({status: 404, description: 'Item not found'})
  async remove(@Param('id') listId: string, @Param('itemId') itemId: string) {
    await this.itemsService.remove(listId, itemId);
    this.logger.debug(`DELETE /lists/${listId}/items/${itemId} -> 204 No Content`);
  }

  @Patch(':itemId/adjust')
  @ApiOperation({summary: 'Adjust item quantity'})
  @ApiResponse({status: 200, description: 'Updated item'})
  @ApiResponse({status: 404, description: 'Item not found'})
  async adjustQuantity(@Param('id') listId: string, @Param('itemId') itemId: string, @Body() dto: AdjustQuantityDto) {
    const result = await this.itemsService.adjustQuantity(listId, itemId, dto);
    this.logger.debug(`PATCH /lists/${listId}/items/${itemId}/adjust -> 200 OK`);
    return result;
  }
}
