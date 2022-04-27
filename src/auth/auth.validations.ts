import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthValidations {
  @IsNotEmpty({
    message: 'Informe o e-mail',
  })
  @IsEmail(
    {},
    {
      message: 'Email inválido',
    },
  )
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha',
  })
  @ApiProperty()
  password: string;
}
