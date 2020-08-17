import FakeDiskStorage from '@shared/container/providers/StorageProviders/fakes/FakeDiskStorage';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateAvatarUserService from './UpdateAvatarUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeDiskStorage;
let updateAvatarUser: UpdateAvatarUserService;

describe('UpdateAvatarUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeDiskStorage();

    updateAvatarUser = new UpdateAvatarUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Deve ser capaz de atualizar o avatar do usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const updateAvatar = await updateAvatarUser.execute({
      userId: user.id,
      filename: 'avatar.jpg',
    });

    expect(updateAvatar.avatar).toBe('avatar.jpg');
  });

  it('Não deve ser capaz de atualizar o avatar de um usuário inexistente', async () => {
    await expect(
      updateAvatarUser.execute({
        filename: 'avatar.jpg',
        userId: 'fulano',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser capaz de sobrescrever o avatar de usuário', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    await updateAvatarUser.execute({
      userId: user.id,
      filename: 'avatar.jpg',
    });

    await updateAvatarUser.execute({
      userId: user.id,
      filename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
