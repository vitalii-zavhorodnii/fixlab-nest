import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

interface IMail {
  subject: string;
  to: string;
  text?: string;
  html?: string;
  context?: object;
  template?: string;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  public async send({
    to,
    text,
    subject,
    html,
    context,
    template
  }: IMail): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        text,
        subject,
        html,
        template,
        context
      });
    } catch (err) {
      throw new InternalServerErrorException('Error while sending e-Mail');
    }
  }

  public async sendPasswordReset(
    email: string,
    login: string,
    password: string
  ): Promise<void> {
    const mail = {
      to: email,
      subject: 'Важливо! Відновлення паролю адміністратора',
      template: 'mail-reset-password',
      context: { name: login, password: password }
    };

    await this.send(mail);
  }
}
