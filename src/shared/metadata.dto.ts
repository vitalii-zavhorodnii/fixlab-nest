import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class MetadataDto {
  @ApiProperty({ example: 'seo title' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'seo titldescriptione' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'seo keywords' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly keywords: string;
}
