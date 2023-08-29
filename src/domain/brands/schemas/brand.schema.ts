import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
class Brand {
  @ApiProperty({ example: 'Apple' })
  @Prop()
  readonly title: string;

  @ApiProperty({ example: 'img dummy NOT USE IT' })
  @Prop()
  readonly image: string;

  @ApiProperty({ example: 'apple' })
  @Prop()
  readonly url: string;

  @ApiProperty({ example: true })
  @Prop()
  readonly isActive: boolean;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { BrandSchema, Brand };
