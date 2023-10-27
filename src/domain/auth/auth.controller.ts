import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { AuthService } from './auth.service';
import { UsersService } from 'domain/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.auth)
@Controller(ROUTES.auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'get token with login and password' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({ status: 401 })
  @Public()
  @Post('/login')
  public async login(@Body() dto: LoginDto): Promise<string> {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 200, type: String })
  @ApiResponse({ status: 400, description: 'Incorrect content data' })
  @ApiResponse({ status: 422, description: 'User was not created' })
  @Public()
  @Post('/register')
  public async register(@Body() dto: RegisterDto): Promise<string> {
    const user = await this.usersService.create({ isActive: true, ...dto });

    if (!user) {
      throw new UnprocessableEntityException('User was not created');
    }

    const token = await this.authService.login({
      login: dto.login,
      password: dto.password
    });

    return token;
  }
}
