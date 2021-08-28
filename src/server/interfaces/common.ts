import {
  ConnectionType,
  EnvType
} from '../enums/common';

export interface Environment {
  name: EnvType;
  port: number;
  host: string;
  pgConnection?: {
    [key in ConnectionType]: DbConnectionInfo;
  },
  redisConnection?: {
    [key in ConnectionType]: RedisConnectionInfo;
  }
}

export interface DbConnectionInfo {
  port: number;
  host: string;
  db: string;
  postFix: string;
  userName: string;
  password: string;
}

export interface RedisConnectionInfo {
  host: string;
  port: number;
  userName: string;
  password: string;
}
