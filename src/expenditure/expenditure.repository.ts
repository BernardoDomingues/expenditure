import { Injectable, ConflictException } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { Expenditure } from 'src/entities/expenditure-entity';

import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { WriteDataDto } from './dto/write-data.dto';

@Injectable()
export class ExpenditureRepository {
  // Define função de acesso á coleção como privada para ser usada apenas por essa classe
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('expenditures');

  async createExpenditure(
    expenditureData: CreateExpenditureDto,
  ): Promise<WriteDataDto> {
    return this._collectionRef.doc().set(expenditureData);
  }

  async listExpenditure(): Promise<Expenditure[] | any> {
    // Busca os dados ativos de Despesas
    const data = [];
    await this._collectionRef
      .where('deletedAt', '==', null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    return data;
  }

  async getExpenditure(id: string): Promise<Expenditure | any> {
    // Busca Despesa específica por ID
    return await this._collectionRef
      .doc(id)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();
        if (!data || data.deletedAt !== null) {
          throw new ConflictException('Despesa Inexistente');
        }
        return {
          id: querySnapshot.id,
          ...querySnapshot.data(),
        };
      });
  }

  async patchExpenditure(id: string, data): Promise<WriteDataDto> {
    // Atualiza um ou mais dados de Despesa específica
    const todayDate = new Date();

    return await this._collectionRef.doc(id).update({
      ...data,
      updatedAt: todayDate,
    });
  }

  async deleteExpenditure(id: string): Promise<WriteDataDto> {
    // Deleta Despesa
    const todayDate = new Date();

    return await this._collectionRef.doc(id).update({
      deletedAt: todayDate,
    });
  }
}
