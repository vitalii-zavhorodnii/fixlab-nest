import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
class User extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true })
  readonly isActive: boolean;

  @ApiProperty({ example: 'admin' })
  @Prop({
    type: String,
    unique: true,
    required: true,
    set: (v: string) => v?.toLowerCase()
  })
  readonly login: string;

  @ApiProperty({ example: 'admin@email.com' })
  @Prop({
    type: String,
    unique: true,
    required: true,
    set: (v: string) => v?.toLowerCase()
  })
  readonly email: string;

  @ApiHideProperty()
  @Prop({ type: String, required: true })
  @Exclude()
  readonly password: string;

  @ApiProperty({ example: 'Admin' })
  @Prop({ type: String, required: true })
  readonly name: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
