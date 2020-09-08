import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeGiftsRepository from '../repositories/fakes/FakeGiftsRepository';
import EditGiftsUserService from './EditGiftsUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeGiftsRepository: FakeGiftsRepository;
let editGiftsUserService: EditGiftsUserService;

describe('EditGiftsUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGiftsRepository = new FakeGiftsRepository();

    editGiftsUserService = new EditGiftsUserService(
      fakeUsersRepository,
      fakeGiftsRepository,
    );
  });

  it('Deve ser capaz de atualizar os presentes do usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const giftsUser = await fakeGiftsRepository.create({
      gift_1: 'A',
      gift_2: 'B',
      gift_3: 'C',
      id_user: user.id,
    });

    const editedGiftsUser = await editGiftsUserService.execute({
      id_user: user.id,
      id_gift: giftsUser.id,
      gift_1: 'presente A',
      gift_2: 'presente B',
      gift_3: 'presente C',
    });

    expect(editedGiftsUser.gift_1).toBe('presente A');
    expect(editedGiftsUser.gift_2).toBe('presente B');
    expect(editedGiftsUser.gift_3).toBe('presente C');
  });

  it('Não deve ser capaz de atualizar os presentes de um usuário inexistente', async () => {
    await expect(
      editGiftsUserService.execute({
        id_user: 'fulano',
        id_gift: 'id',
        gift_1: 'presente A',
        gift_2: 'presente B',
        gift_3: 'presente C',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma lista de presentes inexistente', async () => {
    await expect(
      editGiftsUserService.execute({
        id_user: 'fulano',
        id_gift: 'id',
        gift_1: 'presente A',
        gift_2: 'presente B',
        gift_3: 'presente C',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
