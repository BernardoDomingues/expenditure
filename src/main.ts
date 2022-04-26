import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig } from 'src/config/swagger.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para acesso por fronts

  const document = SwaggerModule.createDocument(app, swaggerConfig); // Configura Documentação
  SwaggerModule.setup('docs', app, document); // Cria Documentação

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
