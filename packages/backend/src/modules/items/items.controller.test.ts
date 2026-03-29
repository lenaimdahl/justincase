import { Test, TestingModule } from '@nestjs/testing';
import { AdjustQuantityDto } from 'src/dtos/adjust-quantity.dto';
import { CreateItemDto } from 'src/dtos/create-item.dto';
import { UpdateItemDto } from 'src/dtos/update-item.dto';
import { ItemsController } from 'src/modules/items/items.controller';
import { ItemsService } from 'src/modules/items/items.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockItem = {
  _id: 'item-id',
  listId: 'list-id',
  name: 'Milk',
  quantity: 2,
  unit: 'liters',
};

const mockItemsService = {
  adjustQuantity: vi.fn(),
  create: vi.fn(),
  remove: vi.fn(),
  update: vi.fn(),
};

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: mockItemsService }],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('create calls service.create with listId and dto', async () => {
    mockItemsService.create.mockResolvedValue(mockItem);

    const dto: CreateItemDto = { name: 'Milk', quantity: 2 };
    const result = await controller.create('list-id', dto);

    expect(result).toEqual(mockItem);
    expect(mockItemsService.create).toHaveBeenCalledWith('list-id', dto);
  });

  it('update calls service.update with listId, itemId and dto', async () => {
    mockItemsService.update.mockResolvedValue(mockItem);

    const dto: UpdateItemDto = { quantity: 5 };
    const result = await controller.update('list-id', 'item-id', dto);

    expect(result).toEqual(mockItem);
    expect(mockItemsService.update).toHaveBeenCalledWith('list-id', 'item-id', dto);
  });

  it('remove calls service.remove with listId and itemId', async () => {
    mockItemsService.remove.mockResolvedValue(undefined);

    await controller.remove('list-id', 'item-id');

    expect(mockItemsService.remove).toHaveBeenCalledWith('list-id', 'item-id');
  });

  it('adjustQuantity calls service.adjustQuantity with listId, itemId and dto', async () => {
    const adjusted = { ...mockItem, quantity: 5 };
    mockItemsService.adjustQuantity.mockResolvedValue(adjusted);

    const dto: AdjustQuantityDto = { adjustment: 3 };
    const result = await controller.adjustQuantity('list-id', 'item-id', dto);

    expect(result).toEqual(adjusted);
    expect(mockItemsService.adjustQuantity).toHaveBeenCalledWith('list-id', 'item-id', dto);
  });
});
