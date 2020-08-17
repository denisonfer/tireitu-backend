import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ITokenEmailUserRepository from '@modules/users/repositories/ITokenEmailUserRepository';
import TokenEmailUserRepository from '@modules/users/infra/typeorm/repositories/TokenEmailUserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokenEmailUserRepository>(
  'TokenEmailUserRepository',
  TokenEmailUserRepository,
);
