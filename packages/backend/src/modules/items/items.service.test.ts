import {BadRequestException, NotFoundException} from '@nestjs/common';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';
import {AdjustQuantityDto} from 'src/dtos/adjust-quantity.dto';
import {CreateItemDto} from 'src/dtos/create-item.dto';
import {UpdateItemDto} from 'src/dtos/update-item.dto';
import {ItemsService} from 'src/modules/items/items.service';
import {Item} from 'src/modules/items/schemas/item.schema';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const mockItem = {
  _id: 'item-id',
  comment: 'Full fat',
  expiryDate: new Date('2026-04-01T23:00:00.000Z'),
  listId: 'list-id',
  name: 'Milk',
  quantity: 2,
  unit: 'liters',
};

const mockItemModel = {
  countDocuments: vi.fn(),
  deleteOne: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  findOneAndUpdate: vi.fn(),
};

function MockItemModelConstructor(data: object) {
  return {
    ...data,
    save: vi.fn().mockResolvedValue({...mockItem, ...data}),
  };
}

Object.assign(MockItemModelConstructor, mockItemModel);

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken(Item.name),
          useValue: MockItemModelConstructor,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  describe('countByListId', () => {
    it('returns the count of items for a list', async () => {
      mockItemModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(3),
      });

      const result = await service.countByListId('list-id');

      expect(result).toBe(3);
      expect(mockItemModel.countDocuments).toHaveBeenCalledWith({
        listId: 'list-id',
      });
    });
  });

  describe('create', () => {
    it('creates an item and stores expiryDate in UTC+1', async () => {
      const dto: CreateItemDto = {
        comment: 'Full fat',
        expiryDate: '2026-04-02T00:00:00.000Z',
        name: 'Milk',
        quantity: 2,
        unit: 'liters',
      };

      const result = await service.create('list-id', dto);

      expect(result.name).toBe('Milk');
      expect(result.quantity).toBe(2);
    });

    it('creates an item without optional fields', async () => {
      const dto: CreateItemDto = {name: 'Sugar', quantity: 1};
      const result = await service.create('list-id', dto);
      expect(result.name).toBe('Sugar');
    });
  });

  describe('update', () => {
    it('returns updated item', async () => {
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockItem),
      });

      const dto: UpdateItemDto = {name: 'Oat Milk', quantity: 3};
      const result = await service.update('list-id', 'item-id', dto);

      expect(result).toEqual(mockItem);
      expect(mockItemModel.findOneAndUpdate).toHaveBeenCalledWith(
        {_id: 'item-id', listId: 'list-id'},
        {name: 'Oat Milk', quantity: 3},
        {new: true}
      );
    });

    it('throws NotFoundException when item not found', async () => {
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.update('list-id', 'missing-id', {})).rejects.toThrow(NotFoundException);
    });

    it('converts expiryDate to UTC+1', async () => {
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockItem),
      });

      const dto: UpdateItemDto = {expiryDate: '2026-04-02T00:00:00.000Z'};
      await service.update('list-id', 'item-id', dto);

      const updateArg = mockItemModel.findOneAndUpdate.mock.calls[0][1];
      expect(updateArg.expiryDate).toEqual(new Date('2026-04-01T23:00:00.000Z'));
    });
  });

  describe('remove', () => {
    it('deletes the item', async () => {
      mockItemModel.deleteOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue({deletedCount: 1}),
      });

      await expect(service.remove('list-id', 'item-id')).resolves.toBeUndefined();
    });

    it('throws NotFoundException when item not found', async () => {
      mockItemModel.deleteOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue({deletedCount: 0}),
      });

      await expect(service.remove('list-id', 'missing-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('adjustQuantity', () => {
    it('adjusts quantity atomically', async () => {
      const updated = {...mockItem, quantity: 5};
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(updated),
      });

      const dto: AdjustQuantityDto = {adjustment: 3};
      const result = await service.adjustQuantity('list-id', 'item-id', dto);

      expect(result.quantity).toBe(5);
      expect(mockItemModel.findOneAndUpdate).toHaveBeenCalledWith(
        {_id: 'item-id', listId: 'list-id'},
        {$inc: {quantity: 3}},
        {new: true}
      );
    });

    it('throws NotFoundException when item not found', async () => {
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.adjustQuantity('list-id', 'missing-id', {adjustment: 1})).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException and rolls back when quantity would go negative', async () => {
      const updated = {...mockItem, quantity: -1};
      mockItemModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(updated),
      });
      mockItemModel.findByIdAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockItem),
      });

      const dto: AdjustQuantityDto = {adjustment: -5};
      await expect(service.adjustQuantity('list-id', 'item-id', dto)).rejects.toThrow(BadRequestException);
      expect(mockItemModel.findByIdAndUpdate).toHaveBeenCalledWith('item-id', {
        $inc: {quantity: 5},
      });
    });
  });
});
