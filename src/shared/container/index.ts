import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITokenEmailUserRepository from '@modules/users/repositories/ITokenEmailUserRepository';
import TokenEmailUserRepository from '@modules/users/infra/typeorm/repositories/TokenEmailUserRepository';

import IGiftsRepository from '@modules/users/repositories/IGiftsRepository';
import GiftsRepository from '@modules/users/infra/typeorm/repositories/GiftsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokenEmailUserRepository>(
  'TokenEmailUserRepository',
  TokenEmailUserRepository,
);

container.registerSingleton<IGiftsRepository>(
  'GiftsRepository',
  GiftsRepository,
);
