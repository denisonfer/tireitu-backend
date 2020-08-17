import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';

import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ITokenEmailUserRepository from '../repositories/ITokenEmailUserRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
export default class SendEmailForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokenEmailUserRepository')
    private tokenEmailUserRepository: ITokenEmailUserRepository,
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não localizado!', 401);
    }

    const { token } = await this.tokenEmailUserRepository.createToken(user.id);

    const templateForgotPassword = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[TireiTu] Recuperação de senha',
      templateData: {
        file: templateForgotPassword,
        variables: {
          name: user.name,
          link: `http://localhost:3000/resetar-senha/?token=${token}`,
        },
      },
    });
  }
}
