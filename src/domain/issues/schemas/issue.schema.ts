import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import MetadataProps from 'shared/metadata-props.schema';

export type IssueDocument = HydratedDocument<Issue>;

class Info {
  @ApiProperty({
    example: 'Безкоштовна діагностика'
  })
  @Prop({ type: String })
  diagnostic: string;

  @ApiProperty({
    example: 'Гарантія до 1 місяця'
  })
  @Prop({ type: String })
  gaurantee: string;

  @ApiProperty({
    example: 'Ремонт від 3 годин'
  })
  @Prop({ type: String })
  repair: string;
}

@Schema({ versionKey: false })
class Issue extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'diagnostic' })
  @Prop({ type: String, unique: true, set: (v: string) => v?.toLowerCase() })
  readonly slug: string;

  @ApiProperty({ example: 'Diagnostic' })
  @Prop({ type: String })
  readonly title: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: [String] })
  readonly images: Array<string>;

  @ApiProperty({ example: 'від 200 грн' })
  @Prop({ type: String })
  readonly price: string;

  @ApiProperty({ type: MetadataProps })
  @Prop({ _id: false, type: MetadataProps })
  readonly metadata: MetadataProps;

  @ApiProperty({ type: Info })
  @Prop({ _id: false, type: Info })
  readonly info: Info;
}

const IssueSchema = SchemaFactory.createForClass(Issue);

IssueSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { Issue, IssueSchema };
