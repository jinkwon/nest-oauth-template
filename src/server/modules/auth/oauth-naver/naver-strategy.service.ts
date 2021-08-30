import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
} from 'passport-naver';
import ENV from '../../../env';
import { MemberService } from '../../member/member.service';
import {
  AuthType,
  DEFAULT_LEVEL
} from '../constants';
import { CreateMemberDto } from '../../member/dto/request/create-member.dto';

@Injectable()
export class NaverStrategyService extends PassportStrategy(Strategy, AuthType.Naver) {

  constructor(
    private readonly memberService: MemberService
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: `${ENV.host}/oauth-naver/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    console.log(profile);

    const memberDto: CreateMemberDto = {
      email: profile?.emails?.[0]?.value,
      name: profile?.displayName,
      level: DEFAULT_LEVEL,
      oauth: {
        oauthPicture: profile?._json?.profile_image,
        oauthId: profile.id,
        oauthEmail: profile?.emails?.[0]?.value,
        oauthType: AuthType.Naver,
        oauthToken: accessToken,
      }
    }
    return await this.memberService.join(memberDto);
  }
}
