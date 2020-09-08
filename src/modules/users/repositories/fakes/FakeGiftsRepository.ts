import Gift from '@modules/users/infra/typeorm/entities/Gift';
import ICreateGiftDTO from '@modules/users/dtos/ICreateGiftDTO';
import { uuid } from 'uuidv4';
import IGiftsRepository from '../IGiftsRepository';

class FakeGiftsRepository implements IGiftsRepository {
  private gifts: Gift[] = [];

  public async create({
    id_user,
    gift_1,
    gift_2,
    gift_3,
  }: ICreateGiftDTO): Promise<Gift> {
    const gift = new Gift();

    Object.assign(gift, { id: uuid(), id_user, gift_1, gift_2, gift_3 });

    this.gifts.push(gift);

    return gift;
  }

  public async save(gift: Gift): Promise<Gift> {
    const giftIndex = this.gifts.findIndex(g => g.id === gift.id);

    this.gifts[giftIndex] = gift;

    return gift;
  }

  public async findById(id_gift: string): Promise<Gift | undefined> {
    const giftFounded = this.gifts.find(gift => gift.id === id_gift);

    return giftFounded;
  }

  public async findByUser(id_user: string): Promise<Gift | undefined> {
    const giftsUser = this.gifts.find(gift => gift.id_user === id_user);

    return giftsUser;
  }
}

export default FakeGiftsRepository;
