import {
  Injectable,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';

import { WriteDataDto } from './dto/write-data.dto';

import { UserRepository } from './users.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { SaveUserDto } from './dto/save-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // Função de encriptar a senha do usuário
  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  async createUser(userData: CreateUserDto): Promise<WriteDataDto> {
    const differentPasswords =
      userData.password != userData.passwordConfirmation; // Compara se as entradas de senhas são iguais

    const registeredEmail = await this.userRepository.validateEmail(
      userData.email,
    ); // Chama função de conferência do e-mail (mesmo e-mail não pode ter duas contas)

    if (differentPasswords) {
      throw new UnprocessableEntityException('Senhas não coincidem');
    } else if (registeredEmail) {
      throw new ConflictException('Email já cadastrado');
    } else {
      const password = await this.encryptPassword(userData.password);

      // Objeto que será salvo no banco
      const createUserData: SaveUserDto = {
        name: userData.name,
        email: userData.email,
        password,
      };
      return this.userRepository.createUser(createUserData);
    }
  }
}
