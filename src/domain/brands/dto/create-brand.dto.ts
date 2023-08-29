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
}
