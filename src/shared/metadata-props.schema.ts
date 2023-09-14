import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

class MetadataProps {
  @ApiProperty({
    example: 'seo title'
  })
  @Prop({ type: String })
  readonly title: string;

  @ApiProperty({
    example: 'seo description'
  })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({
    example: 'seo keywords'
  })
  @Prop({ type: String })
  readonly keywords: string;
}

export default MetadataProps;
