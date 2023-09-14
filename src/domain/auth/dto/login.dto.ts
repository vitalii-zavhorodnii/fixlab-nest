import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Login'
  })
  readonly login: string;

  @ApiProperty({
    example: 'Passord123456',
    description: 'Password'
  })
  readonly password: string;
}
