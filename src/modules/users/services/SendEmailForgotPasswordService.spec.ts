import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProviders/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendEmailForgotPasswordService from './SendEmailForgotPasswordService';
import FakeTokenEmailUserRepository from '../repositories/fakes/FakeTokenEmailUserRepository';

let fakeMailProvider: FakeMailProvider;
let fakeTokenEmailUserRepository: FakeTokenEmailUserRepository;
let fakeUsersRepository: FakeUsersRepository;

let sendEmailForgotPassword: SendEmailForgotPasswordService;

describe('SendEmailForgotPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeTokenEmailUserRepository = new FakeTokenEmailUserRepository();
    fakeUsersRepository = new FakeUsersRepository();

    sendEmailForgotPassword = new SendEmailForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeTokenEmailUserRepository,
    );
  });

  it('Deve ser capaz de recuperar a senha usando o e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    await sendEmailForgotPassword.execute({
      email: 'fulano@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Não deve ser capaz de recuperar a senha usando um usuário inexistente', async () => {
    await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    await expect(
      sendEmailForgotPassword.execute({
        email: 'fulano123@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
