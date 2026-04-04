import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type ListDocument = HydratedDocument<List>;

export class FieldConfig {
  hasCheckbox?: boolean;
  multipleCheckboxes?: boolean;
  checkboxLabels?: string[];
  hasExpiryDate?: boolean;
  hasQuantity?: boolean;
  hasUnit?: boolean;
  hasNotes?: boolean;
  hasPriority?: boolean;
}

@Schema({timestamps: true})
export class List {
  @Prop({required: true})
  userId!: string;

  @Prop({required: true})
  name!: string;

  @Prop({default: '📝'})
  icon!: string;

  @Prop({default: '#9c27b0'})
  color!: string;

  @Prop({type: Object, default: () => ({})})
  fieldConfig!: FieldConfig;
}

export const ListSchema = SchemaFactory.createForClass(List);
