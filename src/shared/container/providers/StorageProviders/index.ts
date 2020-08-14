import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStorage from './implementations/DiskStorage';

const provider = {
  disk: DiskStorage,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider[uploadConfig.driver],
);
