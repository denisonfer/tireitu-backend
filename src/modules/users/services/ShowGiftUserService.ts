import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IGiftsRepository from '../repositories/IGiftsRepository';
import Gift from '../infra/typeorm/entities/Gift';

@injectable()
export default class ShowGiftUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,
  ) { }

  public async execute(user_id: string): Promise<Gift> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não localizado!');
    }

    const gifts = await this.giftsRepository.findByUser(user.id);

    if (!gifts) {
      throw new AppError('Usuário sem lista de presentes cadastrada');
    }

    return gifts;
  }
}
