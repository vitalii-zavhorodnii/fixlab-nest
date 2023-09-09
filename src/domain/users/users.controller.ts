import {
  Controller,
  UsePipes,
  Param,
  UploadedFile,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createUser(
    @Body()
    dto: CreateUserDto,
  ) {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: User, isArray: true })
  @Get('')
  public async findAllUsers() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'remove permanently User by ID' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User was not found' })
  @Delete('/:id')
  public async removeUserById(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  // @ApiOperation({ summary: 'get info about current user' })
  // @ApiResponse({ status: 200 })
  // @ApiResponse({ status: 400, description: 'Incorrect content data' })
  // @Get('/me')
  // public async aboutUser(@AuthUserId() id: string) {
  //   return await this.usersService.findById(id);
  // }
}
