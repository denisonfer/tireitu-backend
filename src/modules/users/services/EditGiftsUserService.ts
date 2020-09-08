import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IGiftsRepository from '../repositories/IGiftsRepository';
import Gift from '../infra/typeorm/entities/Gift';

interface IRequestDTO {
  id_user: string;
  id_gift: string;
  gift_1: string;
  gift_2: string;
  gift_3: string;
}

@injectable()
export default class EditGiftsUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,
  ) { }

  public async execute({
    id_user,
    id_gift,
    gift_1,
    gift_2,
    gift_3,
  }: IRequestDTO): Promise<Gift> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário não localizado!');
    }

    const gifts = await this.giftsRepository.findById(id_gift);

    if (!gifts) {
      throw new AppError('Lista de presentes não localizada');
    }

    gifts.gift_1 = gift_1;
    gifts.gift_2 = gift_2;
    gifts.gift_3 = gift_3;

    this.giftsRepository.save(gifts);

    return gifts;
  }
}
