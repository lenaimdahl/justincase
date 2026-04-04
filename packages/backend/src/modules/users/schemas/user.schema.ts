import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({unique: true, sparse: true})
  username?: string;

  @Prop({required: true, unique: true})
  email!: string;

  @Prop()
  passwordHash?: string;

  @Prop({sparse: true, unique: true})
  googleId?: string;

  @Prop({sparse: true, unique: true})
  appleId?: string;

  @Prop({default: 0})
  tokenVersion!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
