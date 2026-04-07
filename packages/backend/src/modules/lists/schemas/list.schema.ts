import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type ListDocument = HydratedDocument<List>;

export class FieldConfig {
  checkboxLabels?: string[];
  hasCheckbox?: boolean;
  hasExpiryDate?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  multipleCheckboxes?: boolean;
}

@Schema({timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}})
export class List {
  @Prop({default: '#9c27b0'})
  color!: string;

  @Prop({default: () => ({}), type: Object})
  fieldConfig!: FieldConfig;

  @Prop({default: '📝'})
  icon!: string;

  @Prop({required: true})
  name!: string;

  @Prop({required: true})
  userId!: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
