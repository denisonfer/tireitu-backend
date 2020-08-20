import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import EditGroupService from './EditGroupService';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;

let editGroup: EditGroupService;

describe('EditGroup', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    editGroup = new EditGroupService(fakeGroupsRepository, fakeUsersRepository);
  });

  it('Deve ser capaz de editar um grupo', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    const group = await fakeGroupsRepository.create({
      name: 'grupo',
      user_admin: user.id,
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    const groupEdited = await editGroup.execute({
      id_group: group.id,
      name: 'grupo editado',
      user_admin: user.id,
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste editado',
      value_min: 50,
    });

    expect(groupEdited.name).toBe('grupo editado');
  });

  it('Não deve ser capaz de editar um grupo, com um grupo inexistente', async () => {
    await expect(
      editGroup.execute({
        id_group: 'não existe',
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

  it('Não deve ser capaz de editar um grupo, com um admin inexistente', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    const group = await fakeGroupsRepository.create({
      name: 'grupo',
      user_admin: user.id,
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    await expect(
      editGroup.execute({
        id_group: group.id,
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

  it('Não deve ser capaz de editar um grupo, com datas passadas', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    const group = await fakeGroupsRepository.create({
      name: 'grupo',
      user_admin: user.id,
      date_raffle: new Date(2020, 7, 10),
      date_party: new Date(2020, 7, 10),
      hour_party: new Date(2020, 7, 10),
      locale_party: 'rua teste',
      value_min: 50,
    });

    await expect(
      editGroup.execute({
        id_group: group.id,
        name: 'grupo',
        user_admin: user.id,
        date_raffle: new Date(2020, 7, 10),
        date_party: new Date(2020, 7, 10),
        hour_party: new Date(2020, 7, 10),
        locale_party: 'rua teste',
        value_min: 50,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
