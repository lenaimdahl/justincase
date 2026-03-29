import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateListDto } from 'src/dtos/create-list.dto';

export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  createdAt: Date;
}

export interface FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

export interface List {
  id: string;
  name: string;
  items: ListItem[];
  icon: string;
  color: string;
  fieldConfig: FieldConfig;
  createdAt: Date;
}

@Injectable()
export class ListsService {
  private readonly logger = new Logger(ListsService.name);
  private readonly lists = new Map<string, List>();
  private idCounter = 1;

  private generateId(): string {
    return String(this.idCounter++);
  }

  create(createListDto: CreateListDto): List {
    this.logger.debug(`Creating list with name "${createListDto.name}"`);
    const list: List = {
      id: this.generateId(),
      name: createListDto.name,
      items: [],
      icon: createListDto.icon || '📝',
      color: createListDto.color || '#9c27b0',
      fieldConfig: createListDto.fieldConfig || {
        hasCheckbox: true,
        multipleCheckboxes: false,
        checkboxLabels: [],
        hasExpiryDate: false,
        hasQuantity: false,
        hasNotes: false,
        hasPriority: false,
      },
      createdAt: new Date(),
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
}
