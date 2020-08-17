import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ITokenEmailUserRepository from '../repositories/ITokenEmailUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenEmailUserRepository')
    private tokenEmailUserRepository: ITokenEmailUserRepository,
  ) { }

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.tokenEmailUserRepository.findToken(token);

    if (!userToken) {
      throw new AppError('Token de email inexistente', 401);
    }

    const user = await this.usersRepository.findById(userToken.id_user);

    if (!user) {
      throw new AppError('Usuário não localizado', 401);
    }

    const dateCreatedToken = userToken.created_at;
    const compareDate = addHours(dateCreatedToken, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await this.hashProvider.createHash(password);

    await this.usersRepository.save(user);
  }
}
