import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'domain/users/users.service';
import { User } from 'domain/users/schemas/user.schema';
import { PasswordEncryptHelper } from 'helpers/password-encrypt.helper';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto): Promise<string> {
    const user = await this.validatePassword(dto);

    const payload = { sub: user._id, login: user.login };
    return await this.jwtService.signAsync(payload);
  }

  public async validatePassword({ login, password }: LoginDto): Promise<User> {
    const user = await this.usersService.findUserByLogin(login);

    if (!user) throw new NotFoundException('User was not found');

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid)
      throw new NotFoundException('User was not found');

    return user;
  }
}
