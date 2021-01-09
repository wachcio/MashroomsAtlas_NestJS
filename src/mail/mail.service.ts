import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(protected readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<any> {
    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  async sendWelcomeMessage({ username, email }: User): Promise<any> {
    const subject = `Rejestracja w Atlasie grzybów`;
    const html = `Witam.<BR>
    Zarejestrowałeś się w atlasie grzybów jako <b>${username}</b>. Na razie nie możesz edytować danych w nim zawartych. Jeśli chcesz to robić poproś o taką możliwość administrację serwisu.`;
    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

  async sendMessageToAdmin({ username, email, id }: User): Promise<any> {
    const subject = `Nowa rejestracja w Atlasie grzybów`;
    const html = `Witam.<BR>
    Zarejestrował się nowy użytkownik.<BR><BR>
    Dane użytkownika:<br>
    Nazwa: ${username}<br>
    Email: ${email}<br>
    ID: ${id}<br>`;
    await this.mailerService.sendMail({
      to: process.env.MAILER_ADDRESS_TO_ADMIN,
      subject,
      html,
    });
  }
}
