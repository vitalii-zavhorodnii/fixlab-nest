import { ApiProperty } from '@nestjs/swagger';

export class UpdateGadgetDto {
  @ApiProperty({
    example: 'Phone',
    description: 'Gadget title'
  })
  readonly title?: string;

  readonly isActive?: boolean;

  @ApiProperty({
    example: 'We repair phones',
    description: 'Gadget description'
  })
  readonly description?: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs of brands wich related to this gadget'
  })
  readonly brandIds?: number[];

  readonly slug?: string;
  readonly icon?: string;
}
