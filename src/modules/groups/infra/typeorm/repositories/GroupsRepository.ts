import { Repository, getRepository } from 'typeorm';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Group from '../entities/Group';

export default class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async create({
    name,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create({
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }

  public async findById(id_group: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({
      where: {
        id: id_group,
      },
    });

    return group;
  }

  public async delete(group: Group): Promise<void> {
    await this.ormRepository.remove(group);
  }
}
