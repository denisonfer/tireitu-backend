export default interface IHashProvider {
  createHash(password: string): Promise<string>;
  compareHash(password: string, hashGenerated: string): Promise<boolean>;
}
