import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from 'class-validator';

import { MetadataDto } from 'shared/dto/metadata.dto';

export class CreateArticleDto {
  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'remont-playstation-v-kyevi',
    description: 'Article URL'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @ApiProperty({
    example: 'Як самостійно прискорити роботу ноутбука',
    description: 'Article title'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'required to be 1-60 symbols length'
  })
  readonly title: string;

  @ApiProperty({
    example: '<p>Reparing <span>Apple</span> phones...</p>',
    description: 'article richtext'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @ApiProperty({ example: 'Reparing Apple phones...' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly preview: string;

  @ApiProperty({ type: MetadataDto })
  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  readonly metadata?: MetadataDto;

  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @IsOptional()
  @IsString()
  readonly image?: string;
}
