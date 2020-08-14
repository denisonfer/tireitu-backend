import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async createHash(password: string): Promise<string> {
    return password;
  }

  public async compareHash(
    password: string,
    hashGenerated: string,
  ): Promise<boolean> {
    return password === hashGenerated;
  }
}

export default FakeHashProvider;
