import { Environment } from '../interfaces/common';
import { EnvType } from '../enums/common';
import DEV from './dev';
import ALPHA from './alpha';
import BETA from './beta';
import REAL from './real';

function initialEnvSet(env: EnvType): Environment {
  if (process.env.NODE_ENV === 'test') {
    env = EnvType.Dev;
  }
  switch (env) {
    case EnvType.Dev:
      return DEV;
    case EnvType.Beta:
      return BETA;
    case EnvType.Alpha:
      return ALPHA;
    default:
      return REAL;
  }
}

export const PHASE: EnvType = process.env.PHASE as EnvType;
const ENV: Environment = initialEnvSet(PHASE as EnvType);
export default ENV;
