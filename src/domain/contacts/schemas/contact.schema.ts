import { HydratedDocument, Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ContactDocument = HydratedDocument<Contact>;

class Coords {
  @ApiProperty({ example: 50.44930083819644 })
  @Prop({ type: Number })
  lang: number;

  @ApiProperty({ example: 30.523043428894475 })
  @Prop({ type: Number })
  lat: number;
}

@Schema({ versionKey: false })
class Contact extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true,
  })
  readonly id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @ApiProperty({ example: 'Голосіївський' })
  @Prop({ type: String, required: true })
  area: string;

  @ApiProperty({ example: 'Саперно-Слобідська, 10' })
  @Prop({ type: String })
  address: string;

  @ApiProperty({ example: 'Вхід через супермаркет ВЕЛМАРТ' })
  @Prop({ type: String })
  comment: string;

  @ApiProperty({ example: ['Мінська', 'Оболонь'] })
  @Prop({ type: [String] })
  subways: Array<string>;

  @ApiProperty({ example: ['+38 050 227 27 28', '+38 050 227 27 30'] })
  @Prop({ type: [String] })
  phones: Array<string>;

  @ApiProperty({ example: '10:00 - 19:30' })
  @Prop({ type: String })
  workingTime: string;

  @ApiProperty({ example: 'нд - вихідний' })
  @Prop({ type: String })
  workingDate: string;

  @ApiProperty({ type: Coords })
  @Prop({ _id: false, type: Coords })
  coords: Coords;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { ContactSchema, Contact };
