import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IGroupsRepository from '../repositories/IGroupsRepository';
import Group from '../infra/typeorm/entities/Group';

interface IRequestDTO {
  id_user: string;
}

@injectable()
export default class ShowGroupsOfUserService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id_user }: IRequestDTO): Promise<Group[]> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário não localizado!', 401);
    }

    const groups = await this.groupsRepository.findByUser(user.id);

    return groups;
  }
}
