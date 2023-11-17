import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Brand } from '@domain/brands/schemas/brand.schema';
import { Image } from '@domain/images/schemas/image.schema';
import { Issue } from '@domain/issues/schemas/issue.schema';
import { Metadata } from '@shared/schemas/metadata.schema';

export type GadgetDocument = HydratedDocument<Gadget>;

@Schema({ versionKey: false })
class Gadget extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: 'phone' })
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

  @ApiProperty({ example: 'Phone' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'We repeair phones..' })
  @Prop({ type: String, required: true })
  readonly description: string;

  @ApiProperty({ type: Metadata })
  @Prop({ type: Metadata })
  readonly metadata: Metadata;

  @ApiProperty({ type: Image })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Image.name })
  readonly icon: Image;

  @ApiProperty({ type: Image, isArray: true })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Image.name }] })
  readonly gallery: Array<Image>;

  @ApiProperty({ type: Brand, isArray: true })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Brand.name }] })
  readonly brands: Array<Brand>;

  @ApiProperty({ type: Issue, isArray: true })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Issue.name }] })
  readonly issues: Array<Issue>;
}

const GadgetSchema = SchemaFactory.createForClass(Gadget);

export { Gadget, GadgetSchema };
