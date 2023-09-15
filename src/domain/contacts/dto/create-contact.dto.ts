import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: true,
    description: 'if False - will not appear on client side'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({ example: 'Голосіївський', description: 'Area title' })
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly area: string;

  @ApiProperty({ example: 'Саперно-Слобідська, 10' })
  @IsString()
  @Length(1, 120, {
    message: 'title required to be 1-120 symbols length'
  })
  readonly address: string;

  @ApiProperty({ example: 'Вхід через супермаркет ВЕЛМАРТ' })
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @ApiProperty({ example: ['Мінська', 'Оболонь'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly subways?: Array<string>;

  @ApiProperty({ example: ['+38 050 227 27 28', '+38 050 227 27 30'] })
  @IsArray()
  @IsString({ each: true })
  readonly phones: Array<string>;

  @ApiProperty({ example: '10:00 - 19:30' })
  @IsNotEmpty()
  @IsString()
  readonly workingTime: string;

  @ApiProperty({ example: 'нд - вихідний' })
  @IsNotEmpty()
  @IsString()
  readonly workingDate: string;

  @ApiProperty({
    example: { lang: 50.44930083819644, lat: 30.523043428894475 }
  })
  @IsOptional()
  @IsObject()
  readonly coords?: {
    lang: number;
    lat: number;
  };
}
