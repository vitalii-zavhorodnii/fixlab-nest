import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import { Type } from 'class-transformer';

import { Gadget } from 'domain/gadgets/schemas/gadget.schema';
import MetadataProps from 'shared/metadata-props.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ versionKey: false })
class Brand extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false, required: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'apple' })
  @Prop({ type: String, unique: true, set: (v: string) => v?.toLowerCase() })
  readonly slug: string;

  @ApiProperty({ example: 'Apple' })
  @Prop({ type: String })
  readonly title: string;

  @ApiProperty({ example: 'public/brands/icon.svg' })
  @Prop({ type: String, required: false, default: null })
  readonly icon: string;

  @ApiProperty({ example: 'public/brands/image.svg' })
  @Prop({ type: String, required: false, default: null })
  readonly image: string;

  @ApiProperty({ example: 'Reparing Apple phones...' })
  @Prop({ type: String, required: false, default: null })
  readonly article: string;

  @ApiProperty({ example: 'public/brands/image.svg', isArray: true })
  @Prop({ type: [String], required: false, default: null })
  readonly gallery: Array<string>;

  @ApiProperty({
    type: MetadataProps
  })
  @Prop({ type: MetadataProps, required: true })
  readonly metadata: MetadataProps;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { Brand, BrandSchema };
