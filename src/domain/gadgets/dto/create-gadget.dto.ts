import { ApiProperty } from '@nestjs/swagger';

export class CreateGadgetDto {
  @ApiProperty({
    example: 'Phone',
    description: 'Gadget title'
  })
  readonly title: string;

  @ApiProperty({
    example: 'We repair phones',
    description: 'Gadget description'
  })
  readonly description: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs of brands wich related to this gadget'
  })
  readonly brandIds: number[];
}
