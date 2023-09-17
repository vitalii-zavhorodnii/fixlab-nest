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

import MetadataProps from 'shared/metadata-props.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ versionKey: false })
class Brand extends Document {
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
    set: (v: string) => v?.trim().toLowerCase()
  })
  readonly slug: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'Apple' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'public/brands/icon.svg' })
  @Prop({ type: String, default: null })
  readonly icon: string;

  @ApiProperty({ example: 'Reparing Apple phones...' })
  @Prop({ type: String })
  readonly article: string;

  @ApiProperty({
    type: MetadataProps
  })
  @Prop({ type: MetadataProps })
  readonly metadata: MetadataProps;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export { Brand, BrandSchema };
