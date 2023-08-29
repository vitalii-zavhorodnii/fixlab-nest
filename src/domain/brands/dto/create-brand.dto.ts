import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Brand title',
  })
  readonly title: string;

  @ApiProperty({
    example: 'We repair Apple gadgets',
    description: 'Brand description',
  })
  readonly description: string;

  @ApiProperty({
    example: 'xiaomi',
    description: 'Brand URL',
  })
  readonly url: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists',
  })
  readonly isActive: boolean;
}
