import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder() // Define configurações da Documentação
  .setTitle('Expenditure API')
  .setDescription('Documentação para o uso da API de Despesas')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Escreva o Token para obter acesso ás rotas:',
      in: 'Header',
    },
    'Token de Acesso',
  )
  .build();
