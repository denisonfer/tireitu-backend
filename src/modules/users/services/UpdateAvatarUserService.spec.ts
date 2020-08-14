import FakeDiskStorage from '@shared/container/providers/StorageProviders/fakes/FakeDiskStorage';
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
});
