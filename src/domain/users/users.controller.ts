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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.users)
@Controller(ROUTES.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @Post('')
  public async createUser(
    @Body()
    dto: CreateUserDto,
  ) {
    return await this.usersService.create(dto);
  }
}
