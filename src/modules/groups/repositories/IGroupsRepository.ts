import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
  create({
    name,
    user_admin,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: ICreateGroupDTO): Promise<Group>;

  save(group: Group): Promise<Group>;
  findById(id_group: string): Promise<Group | undefined>;
  findByUser(id_user: string): Promise<Group[]>;
  delete(group: Group): Promise<void>;
}
