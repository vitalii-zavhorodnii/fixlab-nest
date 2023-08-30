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

class MetadataDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly seo_title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly seo_description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly seo_keywords: string;
}

export class CreateBrandDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Brand title',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'field required to be 1-60 symbols length',
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
    example: {
      title: 'seo title',
      description: 'seo description',
      keywords: 'seo keywords',
    },
  })
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  readonly metadata: MetadataDto;
}
