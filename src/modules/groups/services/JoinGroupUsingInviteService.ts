import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IGroupsRepository from '../repositories/IGroupsRepository';
import UsersGroups from '../infra/typeorm/entities/UsersGroups';

interface IRequestDTO {
  invite_key: string;
  id_user: string;
}

@injectable()
export default class JoinGroupUsingInviteService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    invite_key,
    id_user,
  }: IRequestDTO): Promise<UsersGroups> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário inexistente', 401);
    }

    const validateInvite = await this.invitesRepository.findByInviteKey(
      invite_key,
    );

    if (!validateInvite) {
      throw new AppError('Chave de convite inválida ou já utilizada', 401);
    }

    const group = await this.groupsRepository.findById(validateInvite.id_group);

    if (!group) {
      throw new AppError('Grupo inexistente', 401);
    }

    const allUsersInGroup = await this.usersGroupsRepository.findUsersByGroup(
      group.id,
    );

    const findUsers = allUsersInGroup.filter(
      usersgroups => usersgroups.id_user === id_user,
    );

    if (findUsers.length > 0) {
      throw new AppError('Usuário já é participante do grupo');
    }

    const joinUserToGroup = await this.usersGroupsRepository.addUserToGroup({
      id_user: user.id,
      id_group: group.id,
    });

    await this.usersGroupsRepository.save(joinUserToGroup);

    await this.invitesRepository.remove(validateInvite);

    return joinUserToGroup;
  }
}
