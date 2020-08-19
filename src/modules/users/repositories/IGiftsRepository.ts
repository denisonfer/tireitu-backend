import Gift from '../infra/typeorm/entities/Gift';
import ICreateGiftDTO from '../dtos/ICreateGiftDTO';

export default interface IGiftsRepository {
  create({ id_user, gift_1, gift_2, gift_3 }: ICreateGiftDTO): Promise<Gift>;
  findById(id_gift: string): Promise<Gift | undefined>;
  save(gift: Gift): Promise<Gift>;
}
