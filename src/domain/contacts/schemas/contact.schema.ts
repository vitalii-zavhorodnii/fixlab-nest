import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import { Image } from '@domain/images/schemas/image.schema';

export type ContactDocument = HydratedDocument<Contact>;

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
  @Prop({ type: String, required: false })
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
  @Prop({ type: String, required: true, default: null })
  readonly workingTime: string;

  @ApiProperty({ example: 'нд - вихідний' })
  @Prop({ type: String, required: true, default: null })
  readonly workingDate: string;

  @ApiProperty({ example: 'https://maps.app.goo.gl/1pi9sxQl' })
  @Prop({ type: String, default: null })
  readonly googleMapLink: string;

  @ApiProperty({ example: 'https://www.google.com/maps/embed?plugin....' })
  @Prop({ type: String, default: null })
  readonly googlePluginLink: string;

  @ApiProperty({ type: Image })
  @Prop({ type: Types.ObjectId, ref: Image.name, default: null })
  readonly image: Types.ObjectId;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

export { Contact, ContactSchema };
