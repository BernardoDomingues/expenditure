import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { UserRepository } from '../users/users.repository';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Busca o token na requisição
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload; // Busca o ID do usuário no payload do token
    const user = this.userRepository.getUserById(id); // Confere existência do usuário
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
