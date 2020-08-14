import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BcryptProvider from './HashProvider/implementations/BcryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);
