import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import { Type } from 'class-transformer';

import { Brand } from 'domain/brands/schemas/brand.schema';
import MetadataProps from 'shared/metadata-props.schema';

export type GadgetDocument = HydratedDocument<Gadget>;

@Schema()
class Gadget extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly id: string;

  @ApiProperty({ example: 'Apple' })
  @Prop({ type: String })
  readonly title: string;

  @ApiProperty({ example: 'Саперно-Слобідська, 10' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 'apple' })
  @Prop({ type: String, unique: true, set: (v: string) => v?.toLowerCase() })
  readonly slug: string;

  @ApiProperty({ example: 'public/brands/image.svg' })
  @Prop({ type: String, required: false, default: null })
  readonly image: string;

  @ApiProperty({ example: 'public/brands/image.svg', isArray: true })
  @Prop({ type: [String], required: false, default: null })
  readonly gallery: Array<string>;

  @ApiProperty({
    type: MetadataProps
  })
  @Prop({ type: MetadataProps, required: true })
  readonly metadata: MetadataProps;

  @ApiProperty({
    type: Brand,
    isArray: true
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: Brand.name }] })
  @Type(() => Brand)
  readonly brands: Array<Brand>;

  readonly issues: string;
}

const GadgetSchema = SchemaFactory.createForClass(Gadget);

GadgetSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { Gadget, GadgetSchema };
