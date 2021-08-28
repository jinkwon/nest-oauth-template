import { DbConnectionInfo } from '../interfaces/common';
import { ConnectionType } from '../enums/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import ENV from '../env';

export function getDbOptions(
  name: ConnectionType
): TypeOrmModuleOptions {
  const connection: DbConnectionInfo = ENV.pgConnection[name];
  console.log(ENV);

  return {
    // name,
    type: 'postgres',
    host: connection.host,
    port: connection.port,
    username: connection.userName,
    password: connection.password,
    database: `${connection.db}${connection.postFix}`,
    synchronize: true,
    autoLoadEntities: true,
  };
}
