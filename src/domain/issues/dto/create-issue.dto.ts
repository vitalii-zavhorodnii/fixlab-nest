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

export class CreateIssueDto {
  @ApiProperty({
    example: 'diagnostic',
    description: 'Issue URL'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug?: string;

  @ApiProperty({
    example: 'Diagnostic',
    description: 'Issue title'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title: string;

  @ApiProperty({
    example: 'від 200 грн',
    description: 'Issue fix price'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30, {
    message: 'title required to be 1-30 symbols length'
  })
  readonly price: string;

  @ApiProperty({
    example: 'Diagnostic...',
    description: 'Issue description'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly info: string;

  @ApiProperty({
    example: 'Diagnostic...',
    description: 'Issue description'
  })
  @IsOptional()
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
  readonly isActive: boolean;

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
  readonly image?: string;

  @ApiProperty({ example: ['64ef4383e46e72721c03090e'] })
  @IsOptional()
  @IsString({ each: true })
  readonly benefits?: string[];
}
