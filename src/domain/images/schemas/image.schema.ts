import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ versionKey: false })
class Image extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ example: 'buffer......' })
  @Prop({ type: Object })
  readonly file: Express.Multer.File;

  @ApiProperty({ example: '/public/image_path' })
  @Prop({ type: String })
  readonly src: string;

  @ApiProperty({ example: 'Alt image' })
  @Prop({ type: String })
  readonly alt: string;

  @ApiProperty({ example: 'Type image' })
  @Prop({ type: String })
  readonly type: string;
}

const ImageSchema = SchemaFactory.createForClass(Image);

export { Image, ImageSchema };
