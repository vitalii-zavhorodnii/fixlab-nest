import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: false,
    description: 'If false, will be disabled and unable to login'
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'Admin',
    description: 'Unique login identifier'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  readonly login: string;

  @ApiProperty({
    example: 'admin@email.com',
    description: 'Unique user email'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

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

  @ApiProperty({
    example: 'Admin',
    description: 'Users name'
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'field required to be 1-60 symbols length'
  })
  readonly name: string;
}
