import Invite from '../infra/typeorm/entities/Invite';
import ICreateInviteDTO from '../dtos/ICreateInviteDTO';

export default interface IInvitesRepository {
  create({ id_group, invite_key }: ICreateInviteDTO): Promise<Invite>;
  findById(id_invite: string): Promise<Invite | undefined>;
  findByInviteKey(invite_key: string): Promise<Invite | undefined>;
  save(invite: Invite): Promise<Invite>;
  remove(invite: Invite): Promise<void>;
}
