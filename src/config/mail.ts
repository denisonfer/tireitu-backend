interface IMailConfig {
  driver: 'ethereal';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Denison Ferreira',
      email: 'denison.shenry@gmail.com',
    },
  },
} as IMailConfig;
