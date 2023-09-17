import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

class Coords {
  @ApiProperty({ example: 50.44930083819644 })
  @Prop({ type: Number })
  readonly lang: number;

  @ApiProperty({ example: 30.523043428894475 })
  @Prop({ type: Number })
  readonly lat: number;
}

@Schema({ versionKey: false })
class Contact extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: Types.ObjectId;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'Голосіївський' })
  @Prop({ type: String, required: true })
  readonly area: string;

  @ApiProperty({ example: 'Саперно-Слобідська, 10' })
  @Prop({ type: String, required: true })
  readonly address: string;

  @ApiProperty({
    example: 'Вхід через супермаркет ВЕЛМАРТ'
  })
  @Prop({ type: String, required: true })
  readonly comment: string;

  @ApiProperty({ example: ['Мінська', 'Оболонь'] })
  @Prop({ type: [String] })
  readonly subways: Array<string>;

  @ApiProperty({
    example: ['+38 050 227 27 28', '+38 050 227 27 30']
  })
  @Prop({ type: [String], required: true })
  readonly phones: Array<string>;

  @ApiProperty({ example: '10:00 - 19:30' })
  @Prop({ type: String, required: true })
  readonly workingTime: string;

  @ApiProperty({ example: 'нд - вихідний' })
  @Prop({ type: String, required: true })
  readonly workingDate: string;

  @ApiProperty({ type: Coords })
  @Prop({ _id: false, type: Coords })
  readonly coords: Coords;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

export { Contact, ContactSchema };
