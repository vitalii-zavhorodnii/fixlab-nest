import { ApiProperty } from '@nestjs/swagger';

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
    example: {
      title: 'seo title',
      description: 'seo description',
      keywords: 'seo keywords',
    },
    required: true,
  })
  readonly metadata?: {
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
  };

  readonly icon?: string;
}
