import type {ListDocument} from 'src/modules/lists/schemas/list.schema';
import type {UserDocument} from 'src/modules/users/schemas/user.schema';

import {Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateListDto} from 'src/dtos/create-list.dto';
import {UpdateListDto} from 'src/dtos/update-list.dto';
import {CurrentUser} from 'src/modules/auth/decorators/current-user.decorator';
import {ItemsService} from 'src/modules/items/items.service';
import {ListsService} from 'src/modules/lists/lists.service';

@ApiBearerAuth()
@ApiTags('lists')
@Controller('api/lists')
export class ListsController {
  private readonly logger = new Logger(ListsController.name);

  constructor(
    private readonly listsService: ListsService,
    private readonly itemsService: ItemsService
  ) {}

  @ApiOperation({summary: 'Create a new list'})
  @ApiResponse({description: 'List created', status: 201})
  @Post()
  async create(@CurrentUser() user: UserDocument, @Body() createListDto: CreateListDto): Promise<ListDocument> {
    const result = await this.listsService.create(String(user._id), createListDto);
    this.logger.debug(`POST /lists -> 201 Created (id: ${result._id})`);
    return result;
  }

  @ApiOperation({summary: 'Get all lists for the current user'})
  @ApiResponse({description: 'List of lists', status: 200})
  @Get()
  async findAll(@CurrentUser() user: UserDocument): Promise<Array<{itemCount: number} & ListDocument>> {
    const lists = await this.listsService.findAll(String(user._id));
    const result = await Promise.all(
      lists.map(async list => ({
        ...list.toObject(),
        itemCount: await this.itemsService.countByListId(String(list._id)),
      }))
    );
    this.logger.debug(`GET /lists -> 200 OK (${result.length} lists)`);
    return result as Array<{itemCount: number} & ListDocument>;
  }

  @ApiOperation({summary: 'Get a single list by ID'})
  @ApiResponse({description: 'The list', status: 200})
  @ApiResponse({description: 'List not found', status: 404})
  @Get(':id')
  async findOne(
    @CurrentUser() user: UserDocument,
    @Param('id') id: string
  ): Promise<{itemCount: number} & ListDocument> {
    const list = await this.listsService.findOne(String(user._id), id);
    const itemCount = await this.itemsService.countByListId(id);
    this.logger.debug(`GET /lists/${id} -> 200 OK`);
    return {...list.toObject(), itemCount} as {itemCount: number} & ListDocument;
  }

  @ApiOperation({summary: 'Delete a list'})
  @ApiResponse({description: 'List deleted', status: 204})
  @ApiResponse({description: 'List not found', status: 404})
  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser() user: UserDocument, @Param('id') id: string): Promise<void> {
    await this.listsService.remove(String(user._id), id);
    this.logger.debug(`DELETE /lists/${id} -> 204 No Content`);
  }

  @ApiOperation({summary: 'Update a list'})
  @ApiResponse({description: 'Updated list', status: 200})
  @ApiResponse({description: 'List not found', status: 404})
  @Patch(':id')
  async update(
    @CurrentUser() user: UserDocument,
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto
  ): Promise<ListDocument> {
    const result = await this.listsService.update(String(user._id), id, updateListDto);
    this.logger.debug(`PATCH /lists/${id} -> 200 OK`);
    return result;
  }
}
