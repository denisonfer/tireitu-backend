import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 'disk';

  diretory: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export default {
  driver: 'disk',

  diretory: tempFolder,
  uploadsFolder: resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
