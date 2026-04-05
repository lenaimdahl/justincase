import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({timestamps: true})
export class Item {
  @Prop()
  comment?: string;

  @Prop()
  expiryDate?: Date;

  @Prop({type: [Date]})
  expiryDates?: Date[];

  @Prop({required: true})
  listId!: string;

  @Prop({required: true})
  name!: string;

  @Prop({min: 0, required: true})
  quantity!: number;

  @Prop()
  unit?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
