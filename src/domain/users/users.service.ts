import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';

import { PasswordEncryptHelper } from 'helpers/password-encrypt.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(dto: CreateUserDto) {
    const password = await PasswordEncryptHelper(dto.password);

    console.log({ ...dto, password });

    const createdUser = await new this.userModel({ ...dto, password }).save();
    const user = await this.userModel
      .findOne({ login: createdUser.login })
      .select('-password -__v');

    return user;
  }

  public async getUserByQuery(query: { password?: string; login?: string }) {
    const user = await this.userModel.findOne(query).select('-password -__v');

    if (!user) {
      throw new NotFoundException(
        `User with login "${query.login}" was not found`,
      );
    }

    return user;
  }
}
