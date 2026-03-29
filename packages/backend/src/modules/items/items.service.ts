import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdjustQuantityDto } from 'src/dtos/adjust-quantity.dto';
import { CreateItemDto } from 'src/dtos/create-item.dto';
import { UpdateItemDto } from 'src/dtos/update-item.dto';
import { Item, ItemDocument } from 'src/modules/items/schemas/item.schema';

const UTC_PLUS_ONE_OFFSET_MS = 60 * 60 * 1000;

function toUtcPlusOne(dateStr: string): Date {
  const date = new Date(dateStr);
  return new Date(date.getTime() - UTC_PLUS_ONE_OFFSET_MS);
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async create(listId: string, dto: CreateItemDto): Promise<ItemDocument> {
    const data: Partial<Item> = {
      listId,
      name: dto.name,
      quantity: dto.quantity,
      unit: dto.unit,
      comment: dto.comment,
    };

    if (dto.expiryDate) {
      data.expiryDate = toUtcPlusOne(dto.expiryDate);
    }

    const item = new this.itemModel(data);
    return item.save();
  }

  async update(
    listId: string,
    itemId: string,
    dto: UpdateItemDto,
  ): Promise<ItemDocument> {
    const update: Partial<Item> = {};

    if (dto.name !== undefined) update.name = dto.name;
    if (dto.quantity !== undefined) update.quantity = dto.quantity;
    if (dto.unit !== undefined) update.unit = dto.unit;
    if (dto.comment !== undefined) update.comment = dto.comment;
    if (dto.expiryDate !== undefined)
      update.expiryDate = toUtcPlusOne(dto.expiryDate);

    const item = await this.itemModel
      .findOneAndUpdate({ _id: itemId, listId }, update, { new: true })
      .exec();

    if (!item) {
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }

    return item;
  }

  async remove(listId: string, itemId: string): Promise<void> {
    const result = await this.itemModel
      .deleteOne({ _id: itemId, listId })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }
  }

  async adjustQuantity(
    listId: string,
    itemId: string,
    dto: AdjustQuantityDto,
  ): Promise<ItemDocument> {
    const item = await this.itemModel
      .findOneAndUpdate(
        { _id: itemId, listId },
        { $inc: { quantity: dto.adjustment } },
        { new: true },
      )
      .exec();

    if (!item) {
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }

    if (item.quantity < 0) {
      await this.itemModel
        .findByIdAndUpdate(itemId, { $inc: { quantity: -dto.adjustment } })
        .exec();
      throw new BadRequestException('Quantity cannot be negative');
    }

    return item;
  }
}
