import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { SaveUserDto } from './dto/save-user.dto';
import { WriteDataDto } from './dto/write-data.dto';

@Injectable()
export class UserRepository {
  // Define função de acesso á coleção como privada para ser usada apenas por essa classe
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('users');

  async validateEmail(email: string): Promise<boolean> {
    let status = false;
    await this._collectionRef
      .where('email', '==', email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            status = true;
          }
        }),
      );
    return status;
  }

  async createUser(userData: SaveUserDto): Promise<WriteDataDto> {
    return this._collectionRef.doc().set(userData);
  }
}
