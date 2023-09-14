import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from './schemas/user.schema';

import { PasswordEncryptHelper } from 'helpers/password-encrypt.helper';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
    const password = await PasswordEncryptHelper(dto.password);

    const createdUser = await new this.userModel({ ...dto, password }).save();
    const user = await this.userModel
      .findOne({ login: createdUser.login })
      .select('-password');

    return user;
  }

  public async findUserByQuery(query: {
    password?: string;
    login?: string;
  }): Promise<User> {
    const user = await this.userModel.findOne(query).select('-password');

    if (!user) {
      throw new NotFoundException(
        `User with login "${query.login}" was not found`
      );
    }

    return user;
  }

  public async findUserByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login });

    if (!user) {
      throw new NotFoundException(`User with login "${login}" was not found`);
    }

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" was not found`);
    }

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');

    return users;
  }

  public async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`Contact User ID ${id} was not found`);
    }

    return user;
  }
}
