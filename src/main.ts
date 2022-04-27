import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig } from 'src/config/swagger.config';
import { initializeFirebase } from './config/firebase.config';

import { AppModule } from './app.module';

dotenv.config(); // Executa função de reconhecimento de variáveis de ambiente
initializeFirebase(); // Executa função de inicio da integração com firebase

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para acesso por fronts

  const document = SwaggerModule.createDocument(app, swaggerConfig); // Configura Documentação
  SwaggerModule.setup('docs', app, document); // Cria Documentação

  await app.listen(process.env.PORT);
}
bootstrap();
