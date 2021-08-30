import { DUR_1_DAY } from '@core/enum/common';

export const jwtConst = {
  secret: 'secretKey',
  cookieName: '__sid',
  expiresIn: `${DUR_1_DAY}s`,
};

export const DEFAULT_LEVEL: number = 1;

export const enum AuthType {
  Google = 'google',
  Kakao = 'kakao',
  Naver = 'naver',
}
