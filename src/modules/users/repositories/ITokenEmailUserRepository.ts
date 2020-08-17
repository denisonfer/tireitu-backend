import TokenEmailUser from '../infra/typeorm/entities/TokenEmailUser';

export default interface ITokenEmailUserRepository {
  createToken(id_user: string): Promise<TokenEmailUser>;
  findToken(token: string): Promise<TokenEmailUser | undefined>;
}
