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

import { Info } from '../schemas/issue.schema';

import { MetadataDto } from 'shared/metadata.dto';

export class CreateIssueDto {
  @ApiProperty({
    example: 'diagnostic',
    description: 'Issue URL'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

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
  readonly description?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({ type: Info })
  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Info)
  readonly info?: Info;

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
}
