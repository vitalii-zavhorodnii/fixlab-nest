import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  readonly email: string;
}
