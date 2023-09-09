import { ApiProperty } from '@nestjs/swagger';
import MetadataProps from 'shared/metadata-props.schema';

export class UpdateBrandDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Brand title',
  })
  readonly title?: string;

  @ApiProperty({
    example: 'We repair Apple gadgets',
    description: 'Brand description',
  })
  readonly description?: string;

  @ApiProperty({
    example: 'xiaomi',
    description: 'Brand URL',
  })
  readonly slug?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists',
  })
  readonly isActive?: boolean;

  @ApiProperty({
    type: MetadataProps,
  })
  readonly metadata?: MetadataProps;

  readonly icon?: string;
}
