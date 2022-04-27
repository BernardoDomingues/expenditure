import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Min } from 'class-validator';

export class ExpenditureValidations {
  // Validações do campo 'description'
  @IsNotEmpty({
    message: 'Informe a Descrição',
  })
  @MaxLength(191, {
    message: 'Descrição muito longa',
  })
  @ApiProperty()
  description: string;

  // Validações do campo 'date'
  @IsNotEmpty({
    message: 'Informe a Data da despesa',
  })
  @ApiProperty()
  date: string;

  // Validações do campo 'userId'
  @IsNotEmpty({
    message: 'Informe o id do usuário',
  })
  @ApiProperty()
  userId: string;

  // Validações do campo 'userId'
  @IsNotEmpty({
    message: 'Informe o valor da despesa',
  })
  @Min(0, {
    message: 'A despesa deve ter um valor positivo',
  })
  @ApiProperty()
  value: number;
}
