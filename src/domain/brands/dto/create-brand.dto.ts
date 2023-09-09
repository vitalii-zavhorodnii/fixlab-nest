import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsObject,
  IsString,
  Length,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

import { MetadataDto } from 'shared/metadata.dto';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Brand title',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length',
  })
  readonly title: string;

  @ApiProperty({
    example: 'We repair Apple gadgets',
    description: 'Brand description',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'xiaomi',
    description: 'Brand URL',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists',
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({
    type: MetadataDto,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  readonly metadata: MetadataDto;
}
