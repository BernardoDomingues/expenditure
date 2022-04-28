import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config'; /* Pacote de configuração do NestJs para utilizar variáveis
de ambiente */
import { MailerOptions } from '@nestjs-modules/mailer';

// Dto dos dados SMTP
export class MailDto {
  smtpServer: string;
  defaultMail: string;
  mailPassword: string;
}

// Classe de configuração do Mailer
export default class MailerConfig {
  private static configSMTP(smtpData: MailDto) {
    // Retorna string de configuração do transport
    const { smtpServer, defaultMail, mailPassword } = smtpData;
    return `smtps://${defaultMail}:${mailPassword}@${smtpServer}`;
  }

  static getMailerConfig(configService: ConfigService): MailerOptions {
    const smtpData = {
      /* Objeto dos dados de configuração do e-mail provedor(Utiliza variáveis
      de ambiente por segurança) */
      smtpServer: configService.get<string>('SMTP_SERVER'),
      defaultMail: configService.get<string>('DEFAULT_MAIL'),
      mailPassword: configService.get<string>('MAIL_PASSWORD'),
    };

    return {
      transport: this.configSMTP(smtpData),
    };
  }
}

export const mailerConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> =>
    MailerConfig.getMailerConfig(configService),
  inject: [ConfigService],
};
