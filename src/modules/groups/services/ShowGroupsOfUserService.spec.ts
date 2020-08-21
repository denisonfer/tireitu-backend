import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowGroupsOfUserService from './ShowGroupsOfUserService';
import FakeUsersGroupsRepository from '../repositories/fakes/FakeUsersGroupsRepository';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersGroupsRepository: FakeUsersGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;

let showGroupsOfUser: ShowGroupsOfUserService;

describe('ShowGroupsOfUser', () => {
  beforeEach(() => {
    fakeUsersGroupsRepository = new FakeUsersGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeGroupsRepository = new FakeGroupsRepository();

    showGroupsOfUser = new ShowGroupsOfUserService(
      fakeUsersGroupsRepository,
      fakeUsersRepository,
    );
  });

  it('Deve ser capaz de exibir os grupos do usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 21).getTime();
    });

    const group1 = await fakeGroupsRepository.create({
      name: 'grupo',
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    const group2 = await fakeGroupsRepository.create({
      name: 'grupo 2',
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    const groupsOfUser = await showGroupsOfUser.execute({
      id_user: user.id,
    });

    expect(groupsOfUser).toEqual([group1, group2]);
  });

  it('Não deve ser capaz de exbir os grupos de um usuário inexistente', async () => {
    await expect(
      showGroupsOfUser.execute({
        id_user: 'não tem',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
