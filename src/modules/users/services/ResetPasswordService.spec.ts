import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeTokenEmailUserRepository from '../repositories/fakes/FakeTokenEmailUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeHashProvider: FakeHashProvider;
let fakeTokenEmailUserRepository: FakeTokenEmailUserRepository;
let fakeUsersRepository: FakeUsersRepository;

let resetPassword: ResetPasswordService;

describe('resetPassword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeTokenEmailUserRepository = new FakeTokenEmailUserRepository();
    fakeUsersRepository = new FakeUsersRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenEmailUserRepository,
    );
  });

  it('Deve ser capaz de resetar a senha do usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const { token } = await fakeTokenEmailUserRepository.createToken(user.id);

    await resetPassword.execute({
      token,
      password: '123456789',
    });

    expect(user.password).toBe('123456789');
  });

  it('Não deve ser capaz de resetar a senha usando um token inexistente', async () => {
    await expect(
      resetPassword.execute({
        token: 'não existe',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de resetar a senha de um usuário inexistente', async () => {
    const { token } = await fakeTokenEmailUserRepository.createToken('null');

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de resetar senha, após 2h da solicitação', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Denison',
      email: 'denison@gmail.com',
      password: '123456',
    });

    const { token } = await fakeTokenEmailUserRepository.createToken(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
