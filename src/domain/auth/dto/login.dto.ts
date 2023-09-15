import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Unique login identifier'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'login required to be 1-60 symbols length'
  })
  readonly login: string;

  @ApiProperty({
    example: '12345',
    description: 'Password of user, must be 10-24 symbols'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(10, 24, {
    message: 'password required to be 10-24 symbols length'
  })
  readonly password: string;
}
