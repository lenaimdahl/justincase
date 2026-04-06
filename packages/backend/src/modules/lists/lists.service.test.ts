import {NotFoundException} from '@nestjs/common';
import {getModelToken} from '@nestjs/mongoose';
import {Test, TestingModule} from '@nestjs/testing';
import {CreateListDto} from 'src/dtos/create-list.dto';
import {UpdateListDto} from 'src/dtos/update-list.dto';
import {ListsService} from 'src/modules/lists/lists.service';
import {List} from 'src/modules/lists/schemas/list.schema';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const VALID_LIST_ID = '507f1f77bcf86cd799439011';
const VALID_USER_ID = '507f1f77bcf86cd799439012';
const INVALID_ID = 'not-an-objectid';

const mockList = {
  _id: VALID_LIST_ID,
  color: '#9c27b0',
  fieldConfig: {hasCheckbox: true},
  icon: '📝',
  name: 'Groceries',
  userId: VALID_USER_ID,
};

const mockListModel = {
  deleteOne: vi.fn(),
  find: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
};

function MockListModelConstructor(data: object) {
  return {
    ...data,
    save: vi.fn().mockResolvedValue({...mockList, ...data}),
  };
}

Object.assign(MockListModelConstructor, mockListModel);

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getModelToken(List.name),
          useValue: MockListModelConstructor,
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  describe('create', () => {
    it('creates and returns a list for the given user', async () => {
      const dto: CreateListDto = {name: 'Groceries'};
      const result = await service.create(VALID_USER_ID, dto);
      expect(result.name).toBe('Groceries');
      expect(result.userId).toBe(VALID_USER_ID);
    });
  });

  describe('findAll', () => {
    it('returns all lists for the given user', async () => {
      mockListModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([mockList, mockList]),
      });

      const result = await service.findAll(VALID_USER_ID);

      expect(result).toHaveLength(2);
      expect(mockListModel.find).toHaveBeenCalledWith({userId: VALID_USER_ID});
    });
  });

  describe('findOne', () => {
    it('returns the list when found', async () => {
      mockListModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockList),
      });

      const result = await service.findOne(VALID_USER_ID, VALID_LIST_ID);

      expect(result).toEqual(mockList);
      expect(mockListModel.findOne).toHaveBeenCalledWith({_id: VALID_LIST_ID, userId: VALID_USER_ID});
    });

    it('throws NotFoundException for an invalid ObjectId', async () => {
      await expect(service.findOne(VALID_USER_ID, INVALID_ID)).rejects.toThrow(NotFoundException);
      expect(mockListModel.findOne).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when list is not found', async () => {
      mockListModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(VALID_USER_ID, VALID_LIST_ID)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes the list when found', async () => {
      mockListModel.deleteOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue({deletedCount: 1}),
      });

      await expect(service.remove(VALID_USER_ID, VALID_LIST_ID)).resolves.toBeUndefined();
      expect(mockListModel.deleteOne).toHaveBeenCalledWith({_id: VALID_LIST_ID, userId: VALID_USER_ID});
    });

    it('throws NotFoundException for an invalid ObjectId', async () => {
      await expect(service.remove(VALID_USER_ID, INVALID_ID)).rejects.toThrow(NotFoundException);
      expect(mockListModel.deleteOne).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when list is not found', async () => {
      mockListModel.deleteOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue({deletedCount: 0}),
      });

      await expect(service.remove(VALID_USER_ID, VALID_LIST_ID)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('returns the updated list', async () => {
      const updated = {...mockList, name: 'Updated'};
      mockListModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(updated),
      });

      const dto: UpdateListDto = {name: 'Updated'};
      const result = await service.update(VALID_USER_ID, VALID_LIST_ID, dto);

      expect(result).toEqual(updated);
      expect(mockListModel.findOneAndUpdate).toHaveBeenCalledWith(
        {_id: VALID_LIST_ID, userId: VALID_USER_ID},
        {name: 'Updated'},
        {new: true}
      );
    });

    it('throws NotFoundException for an invalid ObjectId', async () => {
      await expect(service.update(VALID_USER_ID, INVALID_ID, {})).rejects.toThrow(NotFoundException);
      expect(mockListModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when list is not found', async () => {
      mockListModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.update(VALID_USER_ID, VALID_LIST_ID, {})).rejects.toThrow(NotFoundException);
    });
  });
});
