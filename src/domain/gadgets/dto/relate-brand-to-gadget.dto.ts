import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsString } from 'class-validator';

export class RelateBrandToGadgetDto {
  @ApiProperty({
    example: ['64fbd9d3fba42eff429ec89f', '64fbd9d3fba42eff429ec844'],
    description: 'Brand ID that needs to connect with Gadget'
  })
  @IsArray()
  @IsString({ each: true })
  readonly brandIds: string[];
}
