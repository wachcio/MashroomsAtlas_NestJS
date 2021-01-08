import { Module } from '@nestjs/common';
import mailerconfig = require('../mailerconfig');
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { MailService } from './mail.service';

console.log(process.env);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 2500,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: '',
          pass: '',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      //   preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    // MailerModule.forRoot({
    //   //   transport: process.env.MAILER_TRANSPORT,
    //   transport: 'smtp://admin:admin@localhost:2500',
    //   defaults: {
    //     // from: process.env.MAILER_FROM,
    //     from: 'admin@test.example.com',
    //   },
    //   preview: true,
    //   template: {
    //     dir: './templates/email',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
