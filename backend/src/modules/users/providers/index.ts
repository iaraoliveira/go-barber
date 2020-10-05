import {container} from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCriptHasProvider from './HashProvider/implementations/BCriptHasProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCriptHasProvider);