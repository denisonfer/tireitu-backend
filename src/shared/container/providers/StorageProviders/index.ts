import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorage from './implementations/DiskStorage';
import AWSS3Storage from './implementations/AWSS3Storage';

const provider = {
  disk: DiskStorage,
  s3: AWSS3Storage,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider[uploadConfig.driver],
);
