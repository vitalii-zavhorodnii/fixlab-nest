import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
class User extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: true, required: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'admin' })
  @Prop({ type: String, unique: true, set: (v: string) => v?.toLowerCase() })
  readonly login: string;

  @ApiProperty({ example: 'admin@email.com' })
  @Prop({ type: String, unique: true, set: (v: string) => v?.toLowerCase() })
  readonly email: string;

  @Prop({ type: String })
  readonly password: string;

  @ApiProperty({ example: 'Admin' })
  @Prop({ type: String })
  readonly name: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { User, UserSchema };
