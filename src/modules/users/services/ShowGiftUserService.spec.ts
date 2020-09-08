import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeGiftsRepository from '../repositories/fakes/FakeGiftsRepository';
import ShowGiftUserService from './ShowGiftUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeGiftsRepository: FakeGiftsRepository;
let showGiftsUser: ShowGiftUserService;

describe('ShowGiftsUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeGiftsRepository = new FakeGiftsRepository();
    showGiftsUser = new ShowGiftUserService(
      fakeUserRepository,
      fakeGiftsRepository,
    );
  });

  it('Deve ser capaz de exibir os presentes do usuário', async () => {
    const user = await fakeUserRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    await fakeGiftsRepository.create({
      gift_1: 'A',
      gift_2: 'B',
      gift_3: 'C',
      id_user: user.id,
    });

    const gifsUser = await showGiftsUser.execute(user.id);

    expect(gifsUser.gift_1).toBe('A');
    expect(gifsUser.gift_2).toBe('B');
    expect(gifsUser.gift_3).toBe('C');
  });

  it('Não deve ser capaz de exibir os presentes, de um usuário inexistente', async () => {
    const user_id = 'eita não tem';
    await expect(showGiftsUser.execute(user_id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
