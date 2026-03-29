import {
  BadRequestException,
  Injectable,
  Logger,
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
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async countByListId(listId: string): Promise<number> {
    return this.itemModel.countDocuments({ listId }).exec();
  }

  async findAll(listId: string): Promise<ItemDocument[]> {
    this.logger.debug(`Fetching all items for list ${listId}`);
    return this.itemModel.find({ listId }).exec();
  }

  async create(listId: string, dto: CreateItemDto): Promise<ItemDocument> {
    this.logger.debug(`Creating item "${dto.name}" in list ${listId}`);
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

    if (dto.expiryDates && Array.isArray(dto.expiryDates)) {
      data.expiryDates = dto.expiryDates.map(date => toUtcPlusOne(date));
    }

    const item = new this.itemModel(data);
    const saved = await item.save();
    this.logger.debug(`Item created with id ${saved._id} in list ${listId}`);
    return saved;
  }

  async update(
    listId: string,
    itemId: string,
    dto: UpdateItemDto,
  ): Promise<ItemDocument> {
    this.logger.debug(`Updating item ${itemId} in list ${listId}`);
    const update: Partial<Item> = {};

    if (dto.name !== undefined) update.name = dto.name;
    if (dto.quantity !== undefined) update.quantity = dto.quantity;
    if (dto.unit !== undefined) update.unit = dto.unit;
    if (dto.comment !== undefined) update.comment = dto.comment;
    if (dto.expiryDate !== undefined)
      update.expiryDate = toUtcPlusOne(dto.expiryDate);
    if (dto.expiryDates !== undefined && Array.isArray(dto.expiryDates))
      update.expiryDates = dto.expiryDates.map(date => toUtcPlusOne(date));

    const item = await this.itemModel
      .findOneAndUpdate({ _id: itemId, listId }, update, { new: true })
      .exec();

    if (!item) {
      this.logger.error(`Item ${itemId} not found in list ${listId}`);
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }

    this.logger.debug(`Item ${itemId} updated in list ${listId}`);
    return item;
  }

  async remove(listId: string, itemId: string): Promise<void> {
    this.logger.debug(`Removing item ${itemId} from list ${listId}`);
    const result = await this.itemModel
      .deleteOne({ _id: itemId, listId })
      .exec();

    if (result.deletedCount === 0) {
      this.logger.error(`Item ${itemId} not found in list ${listId}`);
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }

    this.logger.debug(`Item ${itemId} removed from list ${listId}`);
  }

  async adjustQuantity(
    listId: string,
    itemId: string,
    dto: AdjustQuantityDto,
  ): Promise<ItemDocument> {
    this.logger.debug(
      `Adjusting quantity of item ${itemId} in list ${listId} by ${dto.adjustment}`,
    );
    const item = await this.itemModel
      .findOneAndUpdate(
        { _id: itemId, listId },
        { $inc: { quantity: dto.adjustment } },
        { new: true },
      )
      .exec();

    if (!item) {
      this.logger.error(`Item ${itemId} not found in list ${listId}`);
      throw new NotFoundException(`Item ${itemId} not found in list ${listId}`);
    }

    if (item.quantity < 0) {
      this.logger.error(
        `Quantity adjustment of ${dto.adjustment} would make item ${itemId} quantity negative`,
      );
      await this.itemModel
        .findByIdAndUpdate(itemId, { $inc: { quantity: -dto.adjustment } })
        .exec();
      throw new BadRequestException('Quantity cannot be negative');
    }

    this.logger.debug(
      `Item ${itemId} quantity adjusted to ${item.quantity} in list ${listId}`,
    );
    return item;
  }
}
