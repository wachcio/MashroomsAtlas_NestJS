import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class MailService {
  constructor(protected readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<any> {
    console.log(to, subject, html);

    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }
}
