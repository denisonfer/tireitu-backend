import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';

interface IRequestDTO {
  id_group: string;
  id_user: string;
}

@injectable()
export default class ExitGroupService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) { }

  public async execute({ id_group, id_user }: IRequestDTO): Promise<void> {
    const group = await this.usersGroupsRepository.findGroupsByUser(id_user);

    if (!group) {
      throw new AppError('Usuário não é um participante do grupo', 401);
    }

    const userIsAdmin = group.some(
      data => data.admin === true && data.id_user === id_user,
    );

    if (userIsAdmin) {
      throw new AppError(
        'Você é o admin do grupo, não pode sair, somente deletar o grupo',
        401,
      );
    }

    const groupOfUser = group.find(data => data.id_group === id_group);

    if (!groupOfUser) {
      throw new AppError('Usuário não é um participante do grupo', 401);
    }

    await this.usersGroupsRepository.remove(groupOfUser);
  }
}
