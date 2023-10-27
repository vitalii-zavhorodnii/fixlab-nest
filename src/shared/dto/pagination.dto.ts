import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: 2 })
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly page: number;

  @ApiProperty({ example: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly limit: number;
}
