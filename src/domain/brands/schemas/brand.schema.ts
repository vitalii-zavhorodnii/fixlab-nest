import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import { Image } from '@domain/images/schemas/image.schema';
import { Metadata } from '@shared/schemas/metadata.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ versionKey: false })
class Brand extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: 'apple' })
  @Prop({
    type: String,
    unique: true,
    required: true,
    set: (v: string) => v?.trim().toLowerCase()
  })
  readonly slug: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'Apple' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'Reparing Apple phones...' })
  @Prop({ type: String })
  readonly article: string;

  @ApiProperty({ type: Metadata })
  @Prop({ type: Metadata })
  readonly metadata: Metadata;

  @ApiProperty({ type: Image })
  @Prop({ type: Types.ObjectId, ref: Image.name })
  readonly icon: Types.ObjectId;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export { Brand, BrandSchema };
