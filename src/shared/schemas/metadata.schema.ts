import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Metadata {
  @ApiProperty({
    example: 'Reliable Maintenance and Restoration'
  })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({
    example: 'We offer high-quality...'
  })
  @Prop({ type: String, required: true })
  readonly description: string;

  @ApiProperty({
    example: 'repair, maintenance'
  })
  @Prop({ type: String, required: true })
  readonly keywords: string;
}
