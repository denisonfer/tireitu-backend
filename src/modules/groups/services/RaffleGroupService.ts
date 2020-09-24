import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';
import UsersGroups from '../infra/typeorm/entities/UsersGroups';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequestDTO {
  id_group: string;
}

@injectable()
export default class RaffleGroupService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) { }

  public async execute({ id_group }: IRequestDTO): Promise<void> {
    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new AppError('Grupo não localizado', 401);
    }

    const groupAlreadyRaffled = group.status_raffle;

    if (groupAlreadyRaffled) {
      throw new AppError('Grupo já foi sorteado', 401);
    }

    const dataGroup = await this.usersGroupsRepository.findUsersByGroup(
      group.id,
    );

    const usersGroup = dataGroup.map(data => data.id_user).sort();

    function shuffleUsers(users: string[]): string[] {
      let index_current = users.length;
      let value_temp;
      let index_random;
      while (index_current !== 0) {
        index_random = Math.floor(Math.random() * index_current);
        index_current -= 1;
        value_temp = users[index_current];
        users[index_current] = users[index_random];
        users[index_random] = value_temp;
      }
      return users;
    }

    const raffle = shuffleUsers(usersGroup);

    raffle.forEach(async (id_user, index) => {
      const last_user = raffle[raffle.length - 1];
      const idDataGroup = await this.usersGroupsRepository.findByIdPerUserAndGroup(
        id_user,
        id_group,
      );

      if (!idDataGroup) {
        throw new AppError('Dado de grupo não encontrado', 401);
      }

      switch (id_user === last_user) {
        case false:
          idDataGroup.user_raffled = raffle[index + 1];

          break;

        default:
          idDataGroup.user_raffled = raffle[0];

          break;
      }

      await this.usersGroupsRepository.save(idDataGroup);
    });

    group.status_raffle = true;

    await this.groupsRepository.save(group);
  }
}
