import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

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
}
