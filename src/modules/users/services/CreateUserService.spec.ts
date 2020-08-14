import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Deve ser capaz de criar um usuário', async () => {
    const user = await createUser.execute({
      name: 'denison',
      email: 'denison@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um usuário, com e-mail já existente', async () => {
    await createUser.execute({
      name: 'denison',
      email: 'denison@email.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'sheila',
        email: 'denison@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
