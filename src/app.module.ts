import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { mailerConfig } from 'src/config/mailer.config';

import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MailerModule.forRootAsync(mailerConfig), // Configura o serviço de envio de e-mail
    UsersModule, // Adiciona importação do módulo de usuários
    AuthModule, // Adiciona importação do módulo de autenticação
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
