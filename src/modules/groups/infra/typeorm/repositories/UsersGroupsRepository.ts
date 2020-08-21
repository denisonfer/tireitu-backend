import { Repository, getRepository } from 'typeorm';

import IUsersGroupsRepository from '@modules/groups/repositories/IUsersGroupsRepository';
import IAddUserToGroupRequestDTO from '@modules/groups/dtos/IAddUserToGroupRequestDTO';
import UsersGroups from '../entities/UsersGroups';

export default class UsersGroupsRepository implements IUsersGroupsRepository {
  private ormRepository: Repository<UsersGroups>;

  constructor() {
    this.ormRepository = getRepository(UsersGroups);
  }

  public async addUserToGroup({
    id_user,
    id_group,
    admin,
  }: IAddUserToGroupRequestDTO): Promise<UsersGroups> {
    const participants = this.ormRepository.create({
      id_user,
      id_group,
      admin,
    });

    return participants;
  }

  public async save(usersGroups: UsersGroups): Promise<UsersGroups> {
    return this.ormRepository.save(usersGroups);
  }

  public async findUsersByGroup(id_group: string): Promise<UsersGroups[]> {
    const participants = await this.ormRepository.find({
      where: { id_group },
      relations: ['user'],
    });

    return participants;
  }

  public async findGroupsByUser(id_user: string): Promise<UsersGroups[]> {
    const groups = await this.ormRepository.find({
      where: { id_user },
      relations: ['group'],
    });

    return groups;
  }
}
