import { uuid } from 'uuidv4';

import ICreateInviteDTO from '@modules/groups/dtos/ICreateInviteDTO';
import Invite from '@modules/groups/infra/typeorm/entities/Invite';
import IInvitesRepository from '../IInvitesRepository';

export default class FakeInvitesRepository implements IInvitesRepository {
  private invites: Invite[] = [];

  public async create({
    id_group,
    invite_key,
  }: ICreateInviteDTO): Promise<Invite> {
    const invite = new Invite();

    Object.assign(invite, {
      id: uuid(),
      id_group,
      invite_key,
    });

    this.invites.push(invite);

    return invite;
  }

  public async save(invite: Invite): Promise<Invite> {
    const inviteIndex = this.invites.findIndex(i => i.id === invite.id);

    this.invites[inviteIndex] = invite;

    return invite;
  }

  public async findById(id_invite: string): Promise<Invite | undefined> {
    const invite = this.invites.find(i => i.id === id_invite);

    return invite;
  }

  public async findByInviteKey(
    invite_key: string,
  ): Promise<Invite | undefined> {
    const invite = this.invites.find(i => i.invite_key === invite_key);

    return invite;
  }

  public async remove(invite: Invite): Promise<void> {
    const inviteIndex = this.invites.findIndex(i => i.id === invite.id);

    this.invites.splice(inviteIndex, 1);
  }
}
