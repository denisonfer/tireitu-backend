import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequestDTO {
  id_group: string;
}

@injectable()
export default class DeleteGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) { }

  public async execute({ id_group }: IRequestDTO): Promise<void> {
    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new AppError('Grupo não localizado!', 401);
    }

    this.groupsRepository.delete(group);
  }
}
