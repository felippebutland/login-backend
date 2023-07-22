import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  verified: boolean;

  @Prop()
  cellphone: string;

  @Prop()
  password: string;

  @Prop()
  verifyToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  recoverPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
