export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  search<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePreffix(prefixo: string): Promise<void>;
}
