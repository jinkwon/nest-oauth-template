import { Environment } from '../interfaces/common';
import {
  ConnectionType,
  EnvType
} from '../enums/common';

const ENV_DEV: Environment = {
  name: EnvType.Real,
  port: 11002,
  host: '',

  pgConnection: {
    [ConnectionType.Default]: {
      db: '',
      postFix: '',
      userName: '',
      password: '',
      port: 5432,
      host: ''
    }
  },
};

export default ENV_DEV;
