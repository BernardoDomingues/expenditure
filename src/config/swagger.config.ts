import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder() // Define configurações da Documentação
  .setTitle('Expenditure API')
  .setDescription(
    '<h2>Documentação para o uso da API de Despesas</h2>' +
      '<h5>' +
      'Autor: Bernardo Domingues ' +
      '(<a href="https://github.com/BernardoDomingues" target="_blank">GitHub</a>, ' +
      '<a href="https://www.linkedin.com/in/bernardo-domingues14" target="_blank">LinkedIn</a>)' +
      '</h5>' +
      '<h5>Repositório do Projeto: <a href="https://github.com/BernardoDomingues/expenditure" target="_blank">GitHub</a></h5>' +
      '<p>API escrita em <a href="https://docs.nestjs.com/" target="_blank">NestJs</a>, utilizando o comando base `nest new project-name`</p>' +
      '<p>Para o armazenamento foi utilizado o banco de dados não relacional <a href="https://firebase.google.com/?hl=pt" target="_blank">Google Firebase</a>. ' +
      'Ao rodar localmente a API, não será possível ter o acesso ao banco, pois as credenciais foram colocadas em variáveis de ambiente por questões de segurança. ' +
      'Porém, todas as rotas estão disponíveis nesse mesmo endereço de IP(Porta 3000) e através dele é possível fazer cadastros e leituras.</p>',
  )
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
