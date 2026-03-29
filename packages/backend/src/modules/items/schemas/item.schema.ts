import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  listId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, min: 0 })
  quantity!: number;

  @Prop()
  unit?: string;

  @Prop()
  expiryDate?: Date;

  @Prop()
  comment?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
