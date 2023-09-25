import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public.decorator';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';

import { ROUTES } from 'constants/routes.constants';

@ApiTags(ROUTES.auth)
@Controller(ROUTES.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get token with login and password' })
  @ApiResponse({
    status: 200,
    type: 'token'
  })
  @ApiResponse({ status: 401 })
  @Public()
  @Post('/login')
  public async login(@Body() dto: LoginDto): Promise<string> {
    return await this.authService.login(dto);
  }
}
