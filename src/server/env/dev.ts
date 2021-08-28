import { Environment } from '../interfaces/common';
import {
  ConnectionType,
  EnvType
} from '../enums/common';

const ENV_DEV: Environment = {
  name: EnvType.Dev,
  port: 11002,
  host: 'http://localhost:11002',

  pgConnection: {
    [ConnectionType.Default]: {
      db: 'postgres',
      postFix: '',
      userName: '',
      password: '',
      port: 5432,
      host: 'localhost'
    }
  },
};

export default ENV_DEV;
