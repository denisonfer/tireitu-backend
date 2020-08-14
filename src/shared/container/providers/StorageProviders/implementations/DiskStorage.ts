import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorage implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.diretory, file),
      resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorage;
