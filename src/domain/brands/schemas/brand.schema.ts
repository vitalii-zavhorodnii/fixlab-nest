import { HydratedDocument, Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ versionKey: false })
class Brand extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true,
  })
  readonly id: string;

  @ApiProperty({ example: true })
  @Prop({ default: false, required: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'apple' })
  @Prop({ unique: true, set: (v: string) => v?.toLowerCase() })
  readonly slug: string;

  @ApiProperty({ example: 'Apple' })
  @Prop()
  readonly title: string;

  @ApiProperty({ example: 'public/brands/icon.svg' })
  @Prop({ required: false, default: null })
  readonly icon: string;

  @ApiProperty({ example: 'public/brands/image.svg' })
  @Prop({ required: false, default: null })
  readonly image: string;

  @ApiProperty({ example: 'public/brands/image.svg', isArray: true })
  @Prop({ required: false, default: null })
  readonly gallery: string[];

  @ApiProperty({
    example: {
      title: 'seo title',
      description: 'seo description',
      keywords: 'seo keywords',
    },
  })
  @Prop({ type: Object, required: true })
  readonly metadata: {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
  };
}

const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { BrandSchema, Brand };
