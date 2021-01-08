import { HandlebarsAdapter } from '@nest-modules/mailer';

export = {
  transport: process.env.MAILER_TRANSPORT,
  defaults: {
    from: process.env.MAILER_FROM,
  },
  template: {
    dir: './templates/email',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
