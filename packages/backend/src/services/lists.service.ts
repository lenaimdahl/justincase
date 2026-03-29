import { Injectable, NotFoundException } from '@nestjs/common';
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
  private readonly lists = new Map<string, List>();
  private idCounter = 1;

  private generateId(): string {
    return String(this.idCounter++);
  }

  create(createListDto: CreateListDto): List {
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
    return list;
  }

  findAll(): List[] {
    return Array.from(this.lists.values());
  }

  findOne(id: string): List {
    const list = this.lists.get(id);
    if (!list) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  remove(id: string): void {
    if (!this.lists.has(id)) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    this.lists.delete(id);
  }
}
