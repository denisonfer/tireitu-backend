import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import DeleteGroupService from './DeleteGroupService';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;

let deleteGroup: DeleteGroupService;

describe('DeleteGroup', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deleteGroup = new DeleteGroupService(fakeGroupsRepository);
  });

  it('Deve ser capaz de apagar um grupo', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    const group = await fakeGroupsRepository.create({
      name: 'grupo',
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    await expect(
      deleteGroup.execute({
        id_group: group.id,
      }),
    ).resolves;
  });

  it('Não deve ser capaz de apagar um grupo inexistente', async () => {
    await expect(
      deleteGroup.execute({
        id_group: 'não existe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
