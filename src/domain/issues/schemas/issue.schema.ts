import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import MetadataProps from 'shared/metadata-props.schema';

export type IssueDocument = HydratedDocument<Issue>;

export class Info {
  @ApiProperty({
    example: 'Безкоштовна діагностика'
  })
  @Prop({ type: String, default: null })
  readonly diagnostic: string;

  @ApiProperty({
    example: 'Гарантія до 1 місяця'
  })
  @Prop({ type: String, default: null })
  readonly gaurantee: string;

  @ApiProperty({
    example: 'Ремонт від 3 годин'
  })
  @Prop({ type: String, default: null })
  readonly repair: string;
}

@Schema({ versionKey: false })
class Issue extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: Types.ObjectId;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'diagnostic' })
  @Prop({
    type: String,
    unique: true,
    set: (v: string) => v?.trim().toLowerCase()
  })
  readonly slug: string;

  @ApiProperty({ example: 'Diagnostic' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 'від 200 грн' })
  @Prop({ type: String, required: true })
  readonly price: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: [String] })
  readonly images: Array<string>;

  @ApiProperty({ type: MetadataProps })
  @Prop({ _id: false, type: MetadataProps })
  readonly metadata: MetadataProps;

  @ApiProperty({ type: Info })
  @Prop({ _id: false, type: Info })
  readonly info: Info;
}

const IssueSchema = SchemaFactory.createForClass(Issue);

export { Issue, IssueSchema };
