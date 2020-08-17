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
  driver: 'ethereal',

  defaults: {
    from: {
      name: 'Denison Ferreira',
      email: 'denison.shenry@gmail.com',
    },
  },
} as IMailConfig;
