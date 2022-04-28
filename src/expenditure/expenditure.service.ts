import { Injectable, ConflictException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

import { Expenditure } from 'src/entities/expenditure-entity';

import { UsersService } from 'src/users/users.service';

import { ExpenditureRepository } from './expenditure.repository';

import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { SaveExpenditureDto } from './dto/save-expenditure.dto';
import { WriteDataDto } from './dto/write-data.dto';

dotenv.config();

@Injectable()
export class ExpenditureService {
  constructor(
    private usersService: UsersService,
    private expenditureRepository: ExpenditureRepository,
    private mailerService: MailerService,
  ) {}

  async createExpenditure(
    expenditureData: CreateExpenditureDto,
  ): Promise<WriteDataDto> {
    let translateDate = new Date(expenditureData.date);
    const todayDate = new Date();

    if (translateDate.toDateString() === 'Invalid Date') {
      const date = expenditureData.date;
      const americanDate =
        date[3] +
        date[4] +
        '/' +
        date[0] +
        date[1] +
        '/' +
        date[6] +
        date[7] +
        date[8] +
        date[9];
      translateDate = new Date(americanDate);
    }

    const userData = await this.usersService.getUserById(
      expenditureData.userId,
    );

    if (!userData) {
      throw new ConflictException('Usuário Inexistente');
    }

    if (translateDate > todayDate) {
      throw new ConflictException('Não é possível cadastrar uma conta futura');
    }

    // Objeto que será salvo no banco
    const createExpenditureData: SaveExpenditureDto = {
      description: expenditureData.description,
      date: expenditureData.date,
      userId: expenditureData.userId,
      value: expenditureData.value,
      createdAt: todayDate,
      updatedAt: todayDate,
      deletedAt: null,
    };
    const save = await this.expenditureRepository.createExpenditure(
      createExpenditureData,
    );

    // Configura e-mail de confirmação do cadastro de despesa
    const mail = {
      to: userData.email,
      from: process.env.DEFAULT_MAIL,
      subject: 'Expenditure API - Confirmação de Cadastro',
      text: 'Despesa cadastrada com sucesso',
    };
    await this.mailerService.sendMail(mail);

    return save;
  }

  async listExpenditure(): Promise<Expenditure[] | any> {
    return await this.expenditureRepository.listExpenditure();
  }

  async getExpenditure(id: string): Promise<Expenditure | any> {
    return await this.expenditureRepository.getExpenditure(id);
  }

  async patchExpenditure(id: string, data): Promise<WriteDataDto> {
    return await this.expenditureRepository.patchExpenditure(id, data);
  }

  async deleteExpenditure(id: string): Promise<WriteDataDto> {
    return await this.expenditureRepository.deleteExpenditure(id);
  }
}
