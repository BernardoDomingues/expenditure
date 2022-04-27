import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<string> {
    const searchUser = await this.authRepository.getUserByEmail(
      loginData.email,
    );
    const { userData } = searchUser;

    if (!searchUser.status) {
      // Usuário não encontrado
      throw new UnauthorizedException('Usuário ou senha inválidos');
    } else {
      const isValidPassword = await this.authRepository.validatePassword(
        loginData.password,
        userData.password,
      );
      if (!isValidPassword) {
        // Senha inválida
        throw new UnauthorizedException('Usuário ou senha inválidos');
      }
    }

    // Objeto de informações que irão compor o token
    const jwtPayload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    const token = this.jwtService.sign(jwtPayload);

    return token;
  }
}
