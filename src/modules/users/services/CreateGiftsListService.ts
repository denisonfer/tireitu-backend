import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Gift from '../infra/typeorm/entities/Gift';
import IGiftsRepository from '../repositories/IGiftsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  id_user: string;
  gift_1: string;
  gift_2: string;
  gift_3: string;
}

@injectable()
export default class CreateGiftsListService {
  constructor(
    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    id_user,
    gift_1,
    gift_2,
    gift_3,
  }: IRequestDTO): Promise<Gift> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário não localizado!', 401);
    }

    const gifts = await this.giftsRepository.create({
      id_user: user.id,
      gift_1,
      gift_2,
      gift_3,
    });

    await this.cacheProvider.invalidatePreffix('gifts-list');

    await this.giftsRepository.save(gifts);

    return gifts;
  }
}
