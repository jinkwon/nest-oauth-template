import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback
} from 'passport-kakao';
import { config } from 'dotenv';
import ENV from '../../../env';
import { MemberService } from '../../member/member.service';
import { DEFAULT_LEVEL } from '../constants';

config();

@Injectable()
export class KakaoStrategyService extends PassportStrategy(Strategy, 'kakao') {

  constructor(
    private readonly memberService: MemberService
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `${ENV.host}/oauth-kakao/callback`,
    });
    console.log(process.env.KAKAO_CLIENT_ID, process.env.KAKAO_SECRET);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const member = {
      email: profile?._json?.kakao_account?.email || '',
      firstName: profile?.username,
      picture: profile?._json?.properties?.profile_image,
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
        level: DEFAULT_LEVEL,
      });
    }
  }
}
