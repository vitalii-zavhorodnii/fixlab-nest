import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types, now } from 'mongoose';

import { Image } from 'domain/images/schemas/image.schema';
import { Metadata } from 'shared/schemas/metadata.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ versionKey: false })
class Article extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'remont-playstation-v-kyevi' })
  @Prop({
    type: String,
    unique: true,
    required: true,
    set: (v: string) => v?.trim().toLowerCase()
  })
  readonly slug: string;

  @ApiProperty({ example: 'Як самостійно прискорити роботу ноутбука' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'Reparing Apple phones...' })
  @Prop({ type: String, required: true })
  readonly preview: string;

  @ApiProperty({ example: '<p>Reparing <span>Apple</span> phones...</p>' })
  @Prop({ type: String, required: true })
  readonly text: string;

  @ApiProperty({ type: Metadata })
  @Prop({ type: Metadata, default: null })
  readonly metadata: Metadata;

  @ApiProperty({ type: Image })
  @Prop({ type: Types.ObjectId, ref: Image.name, default: null })
  readonly image: Types.ObjectId;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ set: () => now(), default: now() })
  updatedAt: Date;
}

const ArticleSchema = SchemaFactory.createForClass(Article);

export { Article, ArticleSchema };
