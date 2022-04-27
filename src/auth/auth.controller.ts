import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { AuthValidations } from './auth.validations';

import { ReturnLoginDto } from './dto/return-login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login' })
  async login(
    @Body(ValidationPipe) loginData: AuthValidations,
  ): Promise<ReturnLoginDto> {
    const token = await this.authService.login(loginData);
    return {
      token,
      message: 'Login realizado com Sucesso',
    };
  }
}
