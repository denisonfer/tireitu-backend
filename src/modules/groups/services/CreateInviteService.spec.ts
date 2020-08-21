import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProviders/fakes/FakeMailProvider';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';
import FakeInvitesRepository from '../repositories/fakes/FakeInvitesRepository';
import CreateInviteService from './CreateInviteService';

let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersRepository: FakeUsersRepository;
let mailProvider: FakeMailProvider;
let fakeInvitesRepository: FakeInvitesRepository;

let createInvite: CreateInviteService;

describe('CreateInvite', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    fakeInvitesRepository = new FakeInvitesRepository();

    createInvite = new CreateInviteService(
      fakeInvitesRepository,
      fakeGroupsRepository,
      mailProvider,
    );
  });

  it('Deve ser capaz de criar um convite', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 21).getTime();
    });

    await fakeUsersRepository.create({
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

    const invite = await createInvite.execute({
      id_group: group.id,
      name_invited: 'fulano',
      email_invited: 'teste@email.com',
    });

    expect(invite).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um convite para um grupo inexistente', async () => {
    await expect(
      createInvite.execute({
        id_group: '',
        name_invited: 'fulano',
        email_invited: 'teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
