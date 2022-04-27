import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { compare } from 'bcrypt';

import { GetUserByEmailDto } from './dto/get-user-by-email.dto';

@Injectable()
export class AuthRepository {
  // Define função de acesso á coleção como privada para ser usada apenas por essa classe
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('users');

  // Busca usuário pelo e-mail inserido
  async getUserByEmail(email: string): Promise<GetUserByEmailDto> {
    let data: GetUserByEmailDto = {
      status: false,
      userData: {
        id: 0,
        name: '',
        email: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    };
    await this._collectionRef
      .where('email', '==', email.toLowerCase())
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData) {
            data = { status: true, userData };
          }
        }),
      );
    return data;
  }

  // Valida senha inserida
  async validatePassword(
    passwordEntered: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await compare(passwordEntered, dbPassword);
  }
}
