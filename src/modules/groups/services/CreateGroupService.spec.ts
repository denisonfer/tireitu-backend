import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import CreateGroupService from './CreateGroupService';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;

let createGroup: CreateGroupService;

describe('CreateGroup', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createGroup = new CreateGroupService(
      fakeGroupsRepository,
      fakeUsersRepository,
    );
  });

  it('Deve ser capaz de criar um grupo', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 21).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    const group = await createGroup.execute({
      name: 'grupo',
      user_admin: user.id,
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    expect(group).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um grupo, com um admin inexistente', async () => {
    await expect(
      createGroup.execute({
        name: 'grupo',
        user_admin: 'não tem',
        date_raffle: new Date(),
        date_party: new Date(),
        hour_party: new Date(),
        locale_party: 'rua teste',
        value_min: 50,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar um grupo, com datas passadas', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();
    });

    await expect(
      createGroup.execute({
        name: 'grupo',
        user_admin: 'não tem',
        date_raffle: new Date(2020, 7, 10),
        date_party: new Date(2020, 7, 10),
        hour_party: new Date(2020, 7, 10),
        locale_party: 'rua teste',
        value_min: 50,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
