import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { UsersValidations } from './users.validations';

import { ReturnCreateUserDto } from './dto/return-create-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cadastro de Usuário' })
  async createUser(
    @Body(ValidationPipe) userData: UsersValidations,
  ): Promise<ReturnCreateUserDto> {
    const writeData = await this.usersService.createUser(userData);
    return {
      writeData,
      message: 'Usuário Cadastrado com Sucesso',
    };
  }
}
