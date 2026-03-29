import {Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post} from '@nestjs/common';
import {CreateListDto} from 'src/dtos/create-list.dto';
import {UpdateListDto} from 'src/dtos/update-list.dto';
import {ItemsService} from 'src/modules/items/items.service';
import {type List, ListsService} from 'src/services/lists.service';

@Controller('lists')
export class ListsController {
  private readonly logger = new Logger(ListsController.name);

  constructor(
    private readonly listsService: ListsService,
    private readonly itemsService: ItemsService
  ) {}

  @Post()
  create(@Body() createListDto: CreateListDto): List {
    const result = this.listsService.create(createListDto);
    this.logger.debug(`POST /lists -> 201 Created (id: ${result.id})`);
    return result;
  }

  @Get()
  async findAll(): Promise<List[]> {
    const lists = this.listsService.findAll();
    const result = await Promise.all(
      lists.map(async list => ({
        ...list,
        itemCount: await this.itemsService.countByListId(list.id),
      }))
    );
    this.logger.debug(`GET /lists -> 200 OK (${result.length} lists)`);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    const list = this.listsService.findOne(id);
    const itemCount = await this.itemsService.countByListId(id);
    this.logger.debug(`GET /lists/${id} -> 200 OK`);
    return {...list, itemCount};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto): List {
    const result = this.listsService.update(id, updateListDto);
    this.logger.debug(`PATCH /lists/${id} -> 200 OK`);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.listsService.remove(id);
    this.logger.debug(`DELETE /lists/${id} -> 204 No Content`);
  }
}
