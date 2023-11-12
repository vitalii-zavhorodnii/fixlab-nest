import { Public } from '@decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { NotificationsService } from '@domain/notifications/notifications.service';

import { User } from './schemas/user.schema';

import { PasswordGeneratorHelper } from '@helpers/password-generator.helper';

import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService
  ) {}

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: User, isArray: true })
  @Get('')
  public async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createUser(@Body() dto: CreateUserDto): Promise<User | null> {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'update existing user by ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Contact was not found' })
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ): Promise<User | null> {
    return await this.usersService.update(id, dto);
  }

  @ApiOperation({ summary: 'remove permanently user by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User was not found' })
  @Delete('/:id')
  public async removeUserById(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'send email for user with new password' })
  @ApiResponse({ status: 204 })
  @Public()
  @Get('/reset-password')
  public async renewPassword(@Query() { email }: ResetPasswordDto): Promise<void> {
    const updatedPassword = PasswordGeneratorHelper();
    const userFound = await this.usersService.findOneByQuery({
      email,
      isActive: true
    });

    if (!userFound || !userFound.token) {
      throw new NotFoundException(`User with email ${email} was not found!`);
    }

    const user = await this.usersService.update(userFound.id, {
      password: updatedPassword,
      token: null
    });

    await this.notificationsService.sendPasswordReset(
      user.email,
      user.login,
      updatedPassword
    );
  }

  @ApiOperation({ summary: 'create first admin' })
  @ApiResponse({ status: 200, type: User })
  @Public()
  @Get('/init/:key')
  public async createFirstAdmin(
    @Param('key') key: string,
    @Query() query: CreateUserDto
  ): Promise<User> {
    return await this.usersService.createFirstAdmin(key, query);
  }
}
