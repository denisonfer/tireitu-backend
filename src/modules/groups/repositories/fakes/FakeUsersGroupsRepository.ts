import { uuid } from 'uuidv4';

import IAddUserToGroupRequestDTO from '@modules/groups/dtos/IAddUserToGroupRequestDTO';
import UsersGroups from '@modules/groups/infra/typeorm/entities/UsersGroups';
import IUsersGroupsRepository from '../IUsersGroupsRepository';

export default class FakeUsersGroupsRepository
  implements IUsersGroupsRepository {
  private users_groups: UsersGroups[] = [];

  public async addUserToGroup({
    id_user,
    id_group,
    admin,
  }: IAddUserToGroupRequestDTO): Promise<UsersGroups> {
    const participants = new UsersGroups();

    Object.assign(participants, {
      id: uuid(),
      id_user,
      id_group,
      admin,
    });

    this.users_groups.push(participants);

    return participants;
  }

  public async save(usersGroups: UsersGroups): Promise<UsersGroups> {
    const participants = this.users_groups.findIndex(
      i => i.id === usersGroups.id,
    );

    this.users_groups[participants] = usersGroups;

    return usersGroups;
  }

  public async findUsersByGroup(id_group: string): Promise<UsersGroups[]> {
    const participants = this.users_groups.filter(i => i.id_group === id_group);

    return participants;
  }

  public async findGroupsByUser(id_user: string): Promise<UsersGroups[]> {
    const groups = this.users_groups.filter(i => i.id_user === id_user);

    return groups;
  }

  public async remove(usersGroup: UsersGroups): Promise<void> {
    const inviteIndex = this.users_groups.findIndex(
      i => i.id === usersGroup.id,
    );

    this.users_groups.splice(inviteIndex, 1);
  }
}
