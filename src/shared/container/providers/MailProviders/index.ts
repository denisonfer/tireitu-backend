import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const provider = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  provider[mailConfig.driver],
);
