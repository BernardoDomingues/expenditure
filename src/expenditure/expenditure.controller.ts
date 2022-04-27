import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExpenditureService } from './expenditure.service';

import { ExpenditureValidations } from './expenditure.validations';

import { ReturnCreateExpenditureDto } from './dto/return-create-expenditure.dto';

@Controller('/expenditure')
export class ExpenditureController {
  constructor(private expenditureService: ExpenditureService) {}

  @Post()
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Cadastro de Despesa' })
  async createUser(
    @Body(ValidationPipe) expenditureData: ExpenditureValidations,
  ): Promise<ReturnCreateExpenditureDto> {
    const writeData = await this.expenditureService.createExpenditure(
      expenditureData,
    );
    return {
      writeData,
      message: 'Despesa Cadastrada com Sucesso',
    };
  }
}
