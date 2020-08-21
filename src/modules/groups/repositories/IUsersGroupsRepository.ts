import UsersGroups from '../infra/typeorm/entities/UsersGroups';
import IAddUserToGroupRequestDTO from '../dtos/IAddUserToGroupRequestDTO';

export default interface IUsersGroupsRepository {
  addUserToGroup({
    id_user,
    id_group,
    admin,
  }: IAddUserToGroupRequestDTO): Promise<UsersGroups>;
  save(usersGroups: UsersGroups): Promise<UsersGroups>;
  findUsersByGroup(id_group: string): Promise<UsersGroups[]>;
  findGroupsByUser(id_user: string): Promise<UsersGroups[]>;
}
