import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';
import UsersGroups from '../infra/typeorm/entities/UsersGroups';

interface IRequestDTO {
  id_group: string;
}

@injectable()
export default class ShowUsersOfGroupService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) { }

  public async execute({ id_group }: IRequestDTO): Promise<UsersGroups> {
    const participants = await this.usersGroupsRepository.findUsersByGroup(
      id_group,
    );

    if (!participants) {
      throw new AppError('Grupo vazio de usuários', 401);
    }

    return participants;
  }
}
