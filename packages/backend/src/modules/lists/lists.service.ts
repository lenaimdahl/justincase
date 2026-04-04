import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateListDto} from 'src/dtos/create-list.dto';
import {UpdateListDto} from 'src/dtos/update-list.dto';
import {List, ListDocument} from 'src/modules/lists/schemas/list.schema';

@Injectable()
export class ListsService {
  private readonly logger = new Logger(ListsService.name);

  constructor(@InjectModel(List.name) private readonly listModel: Model<ListDocument>) {}

  async create(userId: string, createListDto: CreateListDto): Promise<ListDocument> {
    this.logger.debug(`Creating list "${createListDto.name}" for user ${userId}`);
    const list = new this.listModel({
      userId,
      name: createListDto.name,
      icon: createListDto.icon ?? '📝',
      color: createListDto.color ?? '#9c27b0',
      fieldConfig: createListDto.fieldConfig ?? {
        checkboxLabels: [],
        hasCheckbox: true,
        hasExpiryDate: false,
        hasNotes: false,
        hasPriority: false,
        hasQuantity: false,
        multipleCheckboxes: false,
      },
    });
    const saved = await list.save();
    this.logger.debug(`List created with id ${saved._id}`);
    return saved;
  }

  async findAll(userId: string): Promise<ListDocument[]> {
    this.logger.debug(`Fetching all lists for user ${userId}`);
    return this.listModel.find({userId}).exec();
  }

  async findOne(userId: string, id: string): Promise<ListDocument> {
    this.logger.debug(`Fetching list ${id} for user ${userId}`);
    const list = await this.listModel.findOne({_id: id, userId}).exec();
    if (!list) {
      this.logger.error(`List ${id} not found for user ${userId}`);
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  async update(userId: string, id: string, updateListDto: UpdateListDto): Promise<ListDocument> {
    this.logger.debug(`Updating list ${id} for user ${userId}`);
    const list = await this.listModel
      .findOneAndUpdate(
        {_id: id, userId},
        {
          ...(updateListDto.name !== undefined && {name: updateListDto.name}),
          ...(updateListDto.icon !== undefined && {icon: updateListDto.icon}),
          ...(updateListDto.color !== undefined && {color: updateListDto.color}),
          ...(updateListDto.fieldConfig !== undefined && {fieldConfig: updateListDto.fieldConfig}),
        },
        {new: true}
      )
      .exec();

    if (!list) {
      this.logger.error(`List ${id} not found for user ${userId}`);
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return list;
  }

  async remove(userId: string, id: string): Promise<void> {
    this.logger.debug(`Removing list ${id} for user ${userId}`);
    const result = await this.listModel.deleteOne({_id: id, userId}).exec();
    if (result.deletedCount === 0) {
      this.logger.error(`List ${id} not found for user ${userId}`);
      throw new NotFoundException(`List with id ${id} not found`);
    }
  }
}
