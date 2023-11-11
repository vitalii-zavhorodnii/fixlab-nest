import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from './schemas/user.schema';

import { PasswordEncryptHelper } from '@helpers/password-encrypt.helper';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService
  ) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');

    return users;
  }

  public async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new NotFoundException(`User with ${id} was not found!`);
    }

    return user;
  }

  public async findOneByQuery(query: UpdateUserDto): Promise<User> {
    return await this.userModel.findOne(query).select('-password');
  }

  public async findOneWithPassword(login: string): Promise<User | null> {
    return await this.userModel.findOne({ login });
  }

  public async create(dto: CreateUserDto): Promise<User> {
    const errorData = {
      statusCode: 422,
      error: 'Bad Request',
      message: `User already exists`
    };
    const checkedUser = await this.userModel.findOne({ login: dto.login });

    if (checkedUser) {
      throw new UnprocessableEntityException(errorData);
    }

    const password = await PasswordEncryptHelper(dto.password);

    const createdUser = await new this.userModel({ ...dto, password }).save();

    const user = await this.userModel
      .findOne({ login: createdUser.login })
      .select('-password');

    if (!user) {
      throw new UnprocessableEntityException(errorData);
    }

    return user;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    const password = dto.password
      ? await PasswordEncryptHelper(dto.password)
      : user.password;

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { ...dto, password }, { new: true })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }

    return updatedUser;
  }

  public async remove(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`User ID ${id} was not found`);
    }

    return user;
  }

  public async createFirstAdmin(key: string, dto: CreateUserDto): Promise<User> {
    const originalKey = this.configService.get<string>('D_ADMIN_KEY');
    const users = await this.userModel.find();

    if (users.length > 0 || key !== originalKey || !originalKey) {
      throw new NotAcceptableException();
    }

    const admin = await this.create(dto);

    if (!admin) {
      throw new UnprocessableEntityException('User was not created! Unvalid DTO');
    }

    return admin;
  }
}
