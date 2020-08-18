import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  diretory: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

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

  config: {
    disk: {},
    aws: {
      bucket: 'app-tireitu',
    },
  },
} as IUploadConfig;
