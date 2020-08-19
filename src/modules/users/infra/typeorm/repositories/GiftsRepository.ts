import { Repository, getRepository } from 'typeorm';
import IGiftsRepository from '@modules/users/repositories/IGiftsRepository';
import ICreateGiftDTO from '@modules/users/dtos/ICreateGiftDTO';
import Gift from '../entities/Gift';

class GiftsRepository implements IGiftsRepository {
  private ormRepository: Repository<Gift>;

  constructor() {
    this.ormRepository = getRepository(Gift);
  }

  public async create({
    id_user,
    gift_1,
    gift_2,
    gift_3,
  }: ICreateGiftDTO): Promise<Gift> {
    const gifts = this.ormRepository.create({
      id_user,
      gift_1,
      gift_2,
      gift_3,
    });

    return gifts;
  }

  public async save(gift: Gift): Promise<Gift> {
    return this.ormRepository.save(gift);
  }

  public async findById(id_gift: string): Promise<Gift | undefined> {
    const gifts = this.ormRepository.findOne({
      where: {
        id: id_gift,
      },
    });

    return gifts;
  }
}

export default GiftsRepository;
