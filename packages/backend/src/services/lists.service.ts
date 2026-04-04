import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CreateListDto} from 'src/dtos/create-list.dto';
import {UpdateListDto} from 'src/dtos/update-list.dto';

export interface FieldConfig {
  checkboxLabels?: string[];
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
}

export interface List {
  color: string;
  createdAt: Date;
  fieldConfig: FieldConfig;
  icon: string;
  id: string;
  itemCount?: number;
  items: ListItem[];
  name: string;
}

export interface ListItem {
  createdAt: Date;
  id: string;
  name: string;
  quantity: number;
}

@Injectable()
export class ListsService {
  private idCounter = 1;
  private readonly lists = new Map<string, List>();
  private readonly logger = new Logger(ListsService.name);

  create(createListDto: CreateListDto): List {
    this.logger.debug(`Creating list with name "${createListDto.name}"`);
    const list: List = {
      color: createListDto.color || '#9c27b0',
      createdAt: new Date(),
      fieldConfig: createListDto.fieldConfig || {
        checkboxLabels: [],
        hasCheckbox: true,
        hasExpiryDate: false,
        hasNotes: false,
        hasPriority: false,
        hasQuantity: true,
        hasUnit: true,
        multipleCheckboxes: false,
      },
      icon: createListDto.icon || '📝',
      id: this.generateId(),
      items: [],
      name: createListDto.name,
    };
    this.lists.set(list.id, list);
    this.logger.debug(`List created with id ${list.id}`);
    return list;
  }

  findAll(): List[] {
    this.logger.debug(`Fetching all lists (count: ${this.lists.size})`);
    return Array.from(this.lists.values());
  }

  findOne(id: string): List {
    this.logger.debug(`Fetching list with id ${id}`);
    const list = this.lists.get(id);
    if (!list) {
      this.logger.error(`List with id ${id} not found`);
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  remove(id: string): void {
    this.logger.debug(`Removing list with id ${id}`);
    if (!this.lists.has(id)) {
      this.logger.error(`List with id ${id} not found`);
      throw new NotFoundException(`List with id ${id} not found`);
    }
    this.lists.delete(id);
    this.logger.debug(`List with id ${id} removed`);
  }

  update(id: string, updateListDto: UpdateListDto): List {
    this.logger.debug(`Updating list with id ${id}`);
    const list = this.findOne(id);

    if (updateListDto.name !== undefined) {
      list.name = updateListDto.name;
    }
    if (updateListDto.icon !== undefined) {
      list.icon = updateListDto.icon;
    }
    if (updateListDto.color !== undefined) {
      list.color = updateListDto.color;
    }
    if (updateListDto.fieldConfig !== undefined) {
      list.fieldConfig = updateListDto.fieldConfig;
    }

    this.lists.set(id, list);
    this.logger.debug(`List with id ${id} updated`);
    return list;
  }

  private generateId(): string {
    return String(this.idCounter++);
  }
}
