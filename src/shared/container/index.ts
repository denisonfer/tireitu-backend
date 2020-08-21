import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITokenEmailUserRepository from '@modules/users/repositories/ITokenEmailUserRepository';
import TokenEmailUserRepository from '@modules/users/infra/typeorm/repositories/TokenEmailUserRepository';

import IGiftsRepository from '@modules/users/repositories/IGiftsRepository';
import GiftsRepository from '@modules/users/infra/typeorm/repositories/GiftsRepository';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';

import IInvitesRepository from '@modules/groups/repositories/IInvitesRepository';
import InvitesRepository from '@modules/groups/infra/typeorm/repositories/InvitesRepository';

import IUsersGroupsRepository from '@modules/groups/repositories/IUsersGroupsRepository';
import UsersGroupsRepository from '@modules/groups/infra/typeorm/repositories/UsersGroupsRepository';

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

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IInvitesRepository>(
  'InvitesRepository',
  InvitesRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);
