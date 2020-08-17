import { uuid } from 'uuidv4';

import ITokenEmailUserRepository from '@modules/users/repositories/ITokenEmailUserRepository';
import TokenEmailUser from '@modules/users/infra/typeorm/entities/TokenEmailUser';

class FakeTokenEmailUserRepository implements ITokenEmailUserRepository {
  private tokens: TokenEmailUser[] = [];

  public async createToken(id_user: string): Promise<TokenEmailUser> {
    const tokenEmailUser = new TokenEmailUser();

    Object.assign(tokenEmailUser, {
      id: uuid(),
      token: uuid(),
      id_user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(tokenEmailUser);

    return tokenEmailUser;
  }

  public async findToken(token: string): Promise<TokenEmailUser | undefined> {
    const tokenUser = this.tokens.find(findToken => findToken.token === token);

    return tokenUser;
  }
}

export default FakeTokenEmailUserRepository;
