import {
  ExtractJwt,
  Strategy
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { jwtConst } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConst.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let data: {
          token: string;
          refreshToken?: string;
        } = request?.cookies[jwtConst.cookieName];
        return data?.token || null;
      }]),
    });
  }

  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
