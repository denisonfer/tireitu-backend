import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import EditUserProfileService from './EditUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let editUserProfile: EditUserProfileService;

describe('UpdateAvatarUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    editUserProfile = new EditUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Deve ser capaz de atualizar o perfil do usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const editedUser = await editUserProfile.execute({
      id_user: user.id,
      name: 'sicrano',
      email: 'fulano@email.com',
    });

    expect(editedUser.name).toBe('sicrano');
  });

  it('Não deve ser capaz de atualizar o perfil de um usuário inexistente', async () => {
    await expect(
      editUserProfile.execute({
        id_user: 'fulano',
        name: 'fulano',
        email: 'fulano@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar o perfil do usuário utilizando um email já em uso por outro usuário', async () => {
    await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'sicrano',
      email: 'sicrano@email.com',
      password: '123456',
    });

    await expect(
      editUserProfile.execute({
        id_user: user.id,
        name: 'fulano',
        email: 'fulano@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar a senha, sem informar a senha antiga', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    await expect(
      editUserProfile.execute({
        id_user: user.id,
        name: 'sicrano',
        email: 'fulano@email.com',
        new_password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar a senha, informando a senha antiga errada', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    await expect(
      editUserProfile.execute({
        id_user: user.id,
        name: 'sicrano',
        email: 'fulano@email.com',
        old_password: '123',
        new_password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar a senha, sem informar a nova senha', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    await expect(
      editUserProfile.execute({
        id_user: user.id,
        name: 'sicrano',
        email: 'fulano@email.com',
        old_password: '12356',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
