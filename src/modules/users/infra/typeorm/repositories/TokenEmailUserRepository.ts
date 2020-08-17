import { Repository, getRepository } from 'typeorm';

import ITokenEmailUserRepository from '@modules/users/repositories/ITokenEmailUserRepository';
import TokenEmailUser from '../entities/TokenEmailUser';

class TokenEmailUserRepository implements ITokenEmailUserRepository {
  private ormRepository: Repository<TokenEmailUser>;

  constructor() {
    this.ormRepository = getRepository(TokenEmailUser);
  }

  public async createToken(id_user: string): Promise<TokenEmailUser> {
    const token = this.ormRepository.create({
      id_user,
    });

    await this.ormRepository.save(token);

    return token;
  }

  public async findToken(token: string): Promise<TokenEmailUser | undefined> {
    const tokenUser = await this.ormRepository.findOne({
      where: { token },
    });

    return tokenUser;
  }
}

export default TokenEmailUserRepository;
