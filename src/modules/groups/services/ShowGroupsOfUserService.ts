import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';
import UsersGroups from '../infra/typeorm/entities/UsersGroups';

interface IRequestDTO {
  id_user: string;
}

@injectable()
export default class ShowGroupsOfUserService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id_user }: IRequestDTO): Promise<UsersGroups[]> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário não localizado!', 401);
    }

    const groups = await this.usersGroupsRepository.findGroupsByUser(user.id);

    return groups;
  }
}
