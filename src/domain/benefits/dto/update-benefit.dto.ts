import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class UpdateBenefitDto {
  @ApiProperty({
    example: '"651c7fafb8f1268ad2156521"',
    description: 'Image id'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly icon?: string;

  @ApiProperty({
    example: 'Безкоштовна діагностика',
    description: 'Benefit title'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;
}
