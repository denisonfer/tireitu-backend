import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Group from '../infra/typeorm/entities/Group';
import IGroupsRepository from '../repositories/IGroupsRepository';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';

interface IRequestDTO {
  name: string;
  user_admin: string;
  date_raffle: Date;
  date_party: Date;
  hour_party: Date;
  locale_party: string;
  value_min: number;
}

@injectable()
export default class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) { }

  public async execute({
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

    const group = await this.groupsRepository.create({
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    await this.groupsRepository.save(group);

    const participant = await this.usersGroupsRepository.addUserToGroup({
      id_user: user.id,
      id_group: group.id,
      admin: true,
    });

    await this.usersGroupsRepository.save(participant);

    return group;
  }
}
