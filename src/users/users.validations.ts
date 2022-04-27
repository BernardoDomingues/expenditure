import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
} from 'class-validator';

export class UsersValidations {
  // Validações do campo 'name'
  @IsNotEmpty({
    message: 'Informe o Nome de usuário',
  })
  @MaxLength(255, {
    message: 'Nome de usuário muito longo',
  })
  @ApiProperty()
  name: string;

  // Validações do campo 'email'
  @IsNotEmpty({
    message: 'Informe do Email do usuário',
  })
  @IsEmail(
    {},
    {
      message: 'Email inválido',
    },
  )
  @MaxLength(255, {
    message: 'Email Longo',
  })
  @ApiProperty()
  email: string;

  // Validações do campo 'password'
  @IsString({
    message: 'Senha inválida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'Senha muito longa',
  })
  @ApiProperty()
  password: string;

  // Validações do campo 'passwordConfirmation'
  @IsString({
    message: 'Senha inválida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'Senha muito longa',
  })
  @ApiProperty()
  passwordConfirmation: string;
}
