import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({sparse: true, unique: true})
  appleId?: string;

  @Prop({required: true, unique: true})
  email!: string;

  @Prop({sparse: true, unique: true})
  googleId?: string;

  @Prop()
  passwordHash?: string;

  @Prop({default: 0})
  tokenVersion!: number;

  @Prop({sparse: true, unique: true})
  username?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
