import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Group from '../infra/typeorm/entities/Group';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequestDTO {
  id_group: string;
  name: string;
  user_admin: string;
  date_raffle: Date;
  date_party: Date;
  hour_party: Date;
  locale_party: string;
  value_min: number;
}

@injectable()
export default class EditGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    id_group,
    name,
    user_admin,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: IRequestDTO): Promise<Group> {
    const user = await this.usersRepository.findById(user_admin);

    if (!user) {
      throw new AppError('Usuário não localizado!', 401);
    }

    if (isBefore(date_raffle, Date.now())) {
      throw new AppError(
        'Data do sorteio não pode ser menor que a data atual',
        401,
      );
    }

    if (isBefore(date_party, Date.now())) {
      throw new AppError(
        'Data da festa não pode ser menor que a data atual',
        401,
      );
    }

    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new AppError('Grupo não localizado!', 401);
    }

    group.name = name;
    group.date_raffle = date_raffle;
    group.date_party = date_party;
    group.hour_party = hour_party;
    group.locale_party = locale_party;
    group.value_min = value_min;

    await this.groupsRepository.save(group);

    return group;
  }
}
