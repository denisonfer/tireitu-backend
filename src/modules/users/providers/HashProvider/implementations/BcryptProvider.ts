import bcrypt from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BcryptProvider implements IHashProvider {
  public async createHash(password: string): Promise<string> {
    const passHashed = await bcrypt.hash(password, 8);

    return passHashed;
  }

  public async compareHash(
    password: string,
    hashGenerated: string,
  ): Promise<boolean> {
    const isEqualHash = await bcrypt.compare(password, hashGenerated);

    return isEqualHash;
  }
}

export default BcryptProvider;
