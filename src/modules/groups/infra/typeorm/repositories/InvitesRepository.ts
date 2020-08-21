import { Repository, getRepository } from 'typeorm';

import IInvitesRepository from '@modules/groups/repositories/IInvitesRepository';
import ICreateInviteDTO from '@modules/groups/dtos/ICreateInviteDTO';
import Invite from '../entities/Invite';

export default class InvitesRepository implements IInvitesRepository {
  private ormRepository: Repository<Invite>;

  constructor() {
    this.ormRepository = getRepository(Invite);
  }

  public async create({
    id_group,
    invite_key,
  }: ICreateInviteDTO): Promise<Invite> {
    const invite = this.ormRepository.create({
      id_group,
      invite_key,
    });

    return invite;
  }

  public async findById(id_invite: string): Promise<Invite | undefined> {
    const invite = await this.ormRepository.findOne({
      where: { id: id_invite },
    });

    return invite;
  }

  public async findByInviteKey(
    invite_key: string,
  ): Promise<Invite | undefined> {
    const invite = await this.ormRepository.findOne({
      where: { invite_key },
    });

    return invite;
  }

  public async save(invite: Invite): Promise<Invite> {
    return this.ormRepository.save(invite);
  }

  public async remove(invite: Invite): Promise<void> {
    this.ormRepository.remove(invite);
  }
}
