import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  Document,
  HydratedDocument,
  Types
} from 'mongoose';

import { Type } from 'class-transformer';

import { Brand } from 'domain/brands/schemas/brand.schema';
import { Issue } from 'domain/issues/schemas/issue.schema';
import MetadataProps from 'shared/metadata-props.schema';

export type GadgetDocument = HydratedDocument<Gadget>;

@Schema({ versionKey: false })
class Gadget extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly _id: string;

  @ApiProperty({ example: 'apple' })
  @Prop({
    type: String,
    unique: true,
    required: true,
    set: (v: string) => v?.toLowerCase()
  })
  readonly slug: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'Apple' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'На ринку цифрової...' })
  @Prop({ type: String, required: true })
  readonly description: string;

  @ApiProperty({ example: 'public/gadget/icon.svg' })
  @Prop({ type: String, default: null })
  readonly icon: string;

  @ApiProperty({ example: 'public/gadget/image.svg' })
  @Prop({ type: String, default: null })
  readonly image: string;

  @ApiProperty({
    example: 'public/gadget/image.svg',
    isArray: true
  })
  @Prop({ type: [String], default: null })
  readonly gallery: Array<string>;

  @ApiProperty({
    type: MetadataProps
  })
  @Prop({ type: MetadataProps })
  readonly metadata: MetadataProps;

  @ApiProperty({
    type: Brand,
    isArray: true
  })
  @Prop({
    type: [{ type: Types.ObjectId, ref: Brand.name }]
  })
  @Type(() => Brand)
  readonly brands: Array<Brand>;

  @ApiProperty({
    type: Issue,
    isArray: true
  })
  @Prop({
    type: [{ type: Types.ObjectId, ref: Issue.name }]
  })
  @Type(() => Issue)
  readonly issues: Array<Issue>;
}

const GadgetSchema = SchemaFactory.createForClass(Gadget);

export { Gadget, GadgetSchema };
