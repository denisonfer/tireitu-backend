import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileUserService from './ShowProfileUserService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileUserService;

describe('ShowProfileUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfile = new ShowProfileUserService(fakeUserRepository);
  });

  it('Deve ser capaz de exibir o perfil', async () => {
    const usuario = await fakeUserRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    const perfil = await showProfile.execute({
      user_id: usuario.id,
    });

    expect(perfil.name).toBe('Fulano');
    expect(perfil.email).toBe('fulano@gmail.com');
  });

  it('Não deve ser capaz de exibir o perfil, de um usuário inexistente', async () => {
    await fakeUserRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    await expect(
      showProfile.execute({
        user_id: 'eita não tem',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
