import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Expenditure } from 'src/entities/expenditure-entity';

import { ExpenditureService } from './expenditure.service';

import { ExpenditureValidations } from './expenditure.validations';

import { ReturnCreateExpenditureDto } from './dto/return-create-expenditure.dto';
import { ReturnUpdateExpenditureDto } from './dto/return-update-expenditure.dto';
import { ReturnDeleteExpenditureDto } from './dto/return-delete-expenditure.dto';

@Controller('/expenditure')
export class ExpenditureController {
  constructor(private expenditureService: ExpenditureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth('access-token')
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Cadastro de Despesa' })
  async createExpenditure(
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth('access-token')
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Lista de Despesa' })
  async listExpenditure(): Promise<Expenditure[]> {
    return await this.expenditureService.listExpenditure();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth('access-token')
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Busca de Despesa' })
  async getExpenditure(@Param('id') id: string): Promise<Expenditure> {
    return await this.expenditureService.getExpenditure(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth('access-token')
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Atualiza Despesa' })
  async patchExpenditure(
    @Param('id') id: string,
    @Body() data,
  ): Promise<ReturnUpdateExpenditureDto> {
    const writeData = await this.expenditureService.patchExpenditure(id, data);
    return {
      writeData,
      message: 'Despesa atualizada com sucesso',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBearerAuth('access-token')
  @ApiTags('Expenditure')
  @ApiOperation({ summary: 'Deleta Despesa' })
  async deleteExpenditure(
    @Param('id') id: string,
  ): Promise<ReturnDeleteExpenditureDto> {
    const writeData = await this.expenditureService.deleteExpenditure(id);
    return {
      writeData,
      message: 'Despesa deletada com sucesso',
    };
  }
}
