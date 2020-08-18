import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import AWSSESMailProvider from './implementations/AWSSESMailProvider';

const provider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(AWSSESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  provider[mailConfig.driver],
);
