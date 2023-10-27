import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class AddImageDto {
  @ApiProperty({
    example: 'Image...',
    description: 'Image Object'
  })
  readonly file: Express.Multer.File;

  @ApiProperty({
    example: 'Image alt...',
    description: 'Image alt'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'alt required to be 1-60 symbols length'
  })
  readonly alt: string;

  @ApiProperty({
    example: 'icon',
    description: 'Image src'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly type: string;
}
