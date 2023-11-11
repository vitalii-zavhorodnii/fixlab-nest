import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsArray,
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

import { MetadataDto } from '@shared/dto/metadata.dto';

export class CreateGadgetDto {
  @ApiProperty({
    example: 'phone',
    description: 'Gadget URL'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @ApiProperty({
    example: 'Phone',
    description: 'Gadget title'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title: string;

  @ApiProperty({
    example: 'Apple gadgets...',
    description: 'Gadgets description'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({
    type: MetadataDto
  })
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
  readonly icon?: string;

  @ApiProperty({ example: ['64ef4383e46e72721c03090e'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly gallery?: Array<string>;

  @ApiProperty({ example: ['64ef4383e46e72721c03090e'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly issues?: Array<string>;

  @ApiProperty({ example: ['64ef4383e46e72721c03090e'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly brands?: Array<string>;
}
