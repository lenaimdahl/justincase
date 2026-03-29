import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateListDto } from 'src/dtos/create-list.dto';
import { List, ListsService } from 'src/services/lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() createListDto: CreateListDto): List {
    return this.listsService.create(createListDto);
  }

  @Get()
  findAll(): List[] {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): List {
    return this.listsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.listsService.remove(id);
  }
}
