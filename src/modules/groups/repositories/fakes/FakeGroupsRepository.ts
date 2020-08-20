import { uuid } from 'uuidv4';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';

import Group from '@modules/groups/infra/typeorm/entities/Group';

export default class FakeGroupsRepository implements IGroupsRepository {
  private groups: Group[] = [];

  public async create({
    name,
    user_admin,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: ICreateGroupDTO): Promise<Group> {
    const group = new Group();

    Object.assign(group, {
      id: uuid(),
      name,
      user_admin,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    this.groups.push(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    const groupIndex = this.groups.findIndex(g => g.id === group.id);

    this.groups[groupIndex] = group;

    return group;
  }

  public async findById(id_group: string): Promise<Group | undefined> {
    const group = this.groups.find(g => g.id === id_group);

    return group;
  }

  public async findByUser(id_user: string): Promise<Group[]> {
    const group = this.groups.filter(g => g.user_admin === id_user);

    return group;
  }

  public async delete(group: Group): Promise<void> {
    const groupIndex = this.groups.findIndex(g => g.id === group.id);

    this.groups.splice(groupIndex, 1);
  }
}
