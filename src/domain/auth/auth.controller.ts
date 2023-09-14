import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.auth)
@Controller(ROUTES.auth)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Get token with login and password' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
