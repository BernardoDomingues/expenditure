import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';

dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
