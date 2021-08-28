import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback
} from 'passport-kakao';
import { config } from 'dotenv';
import ENV from '../../../env';
import { MemberService } from '../../member/member.service';

config();

@Injectable()
export class KakaoStrategyService extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly memberService: MemberService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${ENV.host}/oauth-kakao/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const member = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, member);
  }

  async validateMember(email): Promise<any> {
    const member = await this.memberService.findOneByEmail(email);
    if (member && member.email === email) {
      return member;
    }
    return null;
  }

  async kakaoLogin(req) {
    if (!req.user) {
      return 'No user from kakao';
    }

    const member = await this.validateMember(req.user.email);

    if (member) {
      return member;
    } else {
      return await this.memberService.create({
        name: `${[req.user.firstName || '', req.user.lastName || ''].join(' ')}`,
        email: req.user.email,
        level: 0,
      });
    }
  }
}
