import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import FakeInvitesRepository from '../repositories/fakes/FakeInvitesRepository';
import JoinGroupUsingInviteService from './JoinGroupUsingInviteService';
import FakeUsersGroupsRepository from '../repositories/fakes/FakeUsersGroupsRepository';

let fakeUsersGroupRepository: FakeUsersGroupsRepository;
let fakeGroupsRepository: FakeGroupsRepository;
let fakeInvitesRepository: FakeInvitesRepository;
let fakeUsersRepository: FakeUsersRepository;

let joinGroupUsingInvite: JoinGroupUsingInviteService;

describe('JoinGroupUsingInvite', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersGroupRepository = new FakeUsersGroupsRepository();
    fakeInvitesRepository = new FakeInvitesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    joinGroupUsingInvite = new JoinGroupUsingInviteService(
      fakeUsersGroupRepository,
      fakeInvitesRepository,
      fakeGroupsRepository,
      fakeUsersRepository,
    );
  });

  it('Deve ser capaz de adicionar o usuário no grupo usando o convite', async () => {
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

    const invite = await fakeInvitesRepository.create({
      id_group: group.id,
      invite_key: '1234',
    });

    const joinGroup = await joinGroupUsingInvite.execute({
      id_user: user.id,
      invite_key: invite.invite_key,
    });

    expect(joinGroup).toHaveProperty('id');
  });

  it('Não deve ser capaz de entrar no grupo um usuário inexistente', async () => {
    await expect(
      joinGroupUsingInvite.execute({
        id_user: 'não tem',
        invite_key: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de entrar no grupo com um convite inválido', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    await expect(
      joinGroupUsingInvite.execute({
        id_user: user.id,
        invite_key: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de entrar em um grupo inexistente', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    await fakeGroupsRepository.create({
      name: 'grupo',
      date_raffle: new Date(2020, 7, 22),
      date_party: new Date(2020, 7, 22),
      hour_party: new Date(2020, 7, 22),
      locale_party: 'rua teste',
      value_min: 50,
    });

    await fakeInvitesRepository.create({
      id_group: '',
      invite_key: '1234',
    });

    await expect(
      joinGroupUsingInvite.execute({
        id_user: user.id,
        invite_key: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de entrar em um grupo no qual usuário já é um participante', async () => {
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

    const findUserInGroup = await fakeUsersGroupRepository.findUsersByGroup(
      group.id,
    );

    findUserInGroup.filter(item => item.id_user === user.id);

    const invite = await fakeInvitesRepository.create({
      id_group: group.id,
      invite_key: '1234',
    });

    await expect(
      joinGroupUsingInvite.execute({
        id_user: user.id,
        invite_key: invite.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
