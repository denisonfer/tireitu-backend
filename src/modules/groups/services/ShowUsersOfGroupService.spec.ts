import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import ShowUsersOfGroupService from './ShowUsersOfGroupService';
import FakeUsersGroupsRepository from '../repositories/fakes/FakeUsersGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUsersGroupsRepository: FakeUsersGroupsRepository;

let showUsersOfGroup: ShowUsersOfGroupService;

describe('ShowGroupsOfUser', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersGroupsRepository = new FakeUsersGroupsRepository();

    showUsersOfGroup = new ShowUsersOfGroupService(fakeUsersGroupsRepository);
  });

  it('Deve ser capaz de exibir os usuários do grupo', async () => {
    const user1 = await fakeUsersRepository.create({
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

    const usersOfGroups = await showUsersOfGroup.execute({
      id_group: group1.id,
    });

    expect(usersOfGroups).toEqual([user1]);
  });

  it('Não deve ser capaz de exbir os usuários de um grupo inexistente', async () => {
    await expect(
      showUsersOfGroup.execute({
        id_group: 'não tem',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
