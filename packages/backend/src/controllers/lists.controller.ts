import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CreateListDto } from 'src/dtos/create-list.dto';
import { type List, ListsService } from 'src/services/lists.service';

@Controller('lists')
export class ListsController {
  private readonly logger = new Logger(ListsController.name);

  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() createListDto: CreateListDto): List {
    const result = this.listsService.create(createListDto);
    this.logger.debug(`POST /lists -> 201 Created (id: ${result.id})`);
    return result;
  }

  @Get()
  findAll(): List[] {
    const result = this.listsService.findAll();
    this.logger.debug(`GET /lists -> 200 OK (${result.length} lists)`);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string): List {
    const result = this.listsService.findOne(id);
    this.logger.debug(`GET /lists/${id} -> 200 OK`);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.listsService.remove(id);
    this.logger.debug(`DELETE /lists/${id} -> 204 No Content`);
  }
}
