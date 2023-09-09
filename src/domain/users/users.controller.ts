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
import { AuthUserId } from '../../decorators/user.decorator';

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

  // @ApiOperation({ summary: 'get info about current user' })
  // @ApiResponse({ status: 200 })
  // @ApiResponse({ status: 400, description: 'Incorrect content data' })
  // @Get('/me')
  // public async aboutUser(@AuthUserId() id: string) {
  //   return await this.usersService.findById(id);
  // }
}
