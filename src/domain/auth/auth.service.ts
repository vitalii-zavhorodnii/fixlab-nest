import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'domain/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByQuery({ login });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException(
        `User with login "${login}" was not found`,
      );
    }
    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  public async login(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
