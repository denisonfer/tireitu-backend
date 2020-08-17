import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  id_user: string;
  name: string;
  email: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
export default class EditUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    id_user,
    name,
    email,
    old_password,
    new_password,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário não localizado.', 401);
    }

    const userEmailVerify = await this.usersRepository.findByEmail(email);

    if (userEmailVerify && userEmailVerify.id !== id_user) {
      throw new AppError('E-mail já em uso por outro usuário', 401);
    }

    user.name = name;
    user.email = email;

    if (new_password && !old_password) {
      throw new AppError('Senha antiga é obrigatória', 401);
    }

    if (old_password && !new_password) {
      throw new AppError('Senha nova é obrigatória', 401);
    }

    if (old_password && new_password) {
      const userPasswordVerify = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!userPasswordVerify) {
        throw new AppError('Senha antiga incorreta', 401);
      }

      user.password = await this.hashProvider.createHash(new_password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}
