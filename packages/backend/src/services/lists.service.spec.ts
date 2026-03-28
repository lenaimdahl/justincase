import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateListDto } from 'src/dtos/create-list.dto';
import { ListsService } from 'src/services/lists.service';

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    service = new ListsService();
  });

  describe('create', () => {
    it('should create and return a new list', () => {
      const dto: CreateListDto = { name: 'Groceries' };
      const list = service.create(dto);

      expect(list.id).toBeDefined();
      expect(list.name).toBe('Groceries');
      expect(list.items).toEqual([]);
      expect(list.createdAt).toBeInstanceOf(Date);
    });

    it('should assign unique ids to each list', () => {
      const first = service.create({ name: 'List A' });
      const second = service.create({ name: 'List B' });

      expect(first.id).not.toBe(second.id);
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no lists exist', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('should return all created lists', () => {
      service.create({ name: 'List A' });
      service.create({ name: 'List B' });

      const lists = service.findAll();
      expect(lists).toHaveLength(2);
      expect(lists.map(l => l.name)).toEqual(expect.arrayContaining(['List A', 'List B']));
    });
  });

  describe('findOne', () => {
    it('should return the list with the given id', () => {
      const created = service.create({ name: 'Medicines' });
      const found = service.findOne(created.id);

      expect(found).toEqual(created);
    });

    it('should throw NotFoundException for an unknown id', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete the list with the given id', () => {
      const created = service.create({ name: 'To Remove' });
      service.remove(created.id);

      expect(service.findAll()).toHaveLength(0);
    });

    it('should throw NotFoundException when deleting an unknown id', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });
});
