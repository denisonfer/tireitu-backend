import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  userId: string;
  filename: string;
}

@injectable()
export default class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ userId, filename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não localizado', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const file = await this.storageProvider.saveFile(filename);

    user.avatar = file;

    await this.usersRepository.save(user);

    return user;
  }
}
