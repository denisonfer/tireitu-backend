import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
  create({
    name,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: ICreateGroupDTO): Promise<Group>;

  save(group: Group): Promise<Group>;
  findById(id_group: string): Promise<Group | undefined>;
  delete(group: Group): Promise<void>;
}
