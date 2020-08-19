import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeGiftsRepository from '../repositories/fakes/FakeGiftsRepository';
import CreateGiftsListService from './CreateGiftsListService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeGifsRepository: FakeGiftsRepository;

let createGiftsList: CreateGiftsListService;

describe('CreateGiftsList', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeGifsRepository = new FakeGiftsRepository();

    createGiftsList = new CreateGiftsListService(
      fakeGifsRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('Deve ser capaz de criar uma lista de presentes', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@teste.com',
      password: '123456',
    });

    const gifts = await createGiftsList.execute({
      id_user: user.id,
      gift_1: 'presente 1',
      gift_2: 'presente 2',
      gift_3: 'presente 3',
    });

    expect(gifts).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma lista de presentes, para um usuário inexistente', async () => {
    await expect(
      createGiftsList.execute({
        id_user: 'não tem',
        gift_1: 'presente 1',
        gift_2: 'presente 2',
        gift_3: 'presente 3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
