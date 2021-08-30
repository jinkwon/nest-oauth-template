import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
} from 'passport-kakao';
import ENV from '../../../env';
import { MemberService } from '../../member/member.service';
import {
  AuthType,
  DEFAULT_LEVEL
} from '../constants';
import { CreateMemberDto } from '../../member/dto/request/create-member.dto';

@Injectable()
export class KakaoStrategyService extends PassportStrategy(Strategy, AuthType.Kakao) {

  constructor(
    private readonly memberService: MemberService
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `${ENV.host}/oauth-kakao/callback`,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const memberDto: CreateMemberDto = {
      email: profile?._json?.kakao_account?.email || '',
      name: profile?.username,
      level: DEFAULT_LEVEL,
      oauth: {
        oauthPicture: profile?._json?.properties?.profile_image,
        oauthId: profile.id,
        oauthEmail: profile?._json?.kakao_account?.email || '',
        oauthType: AuthType.Kakao,
        oauthToken: accessToken,
      }
    }
    return await this.memberService.join(memberDto);
  }
}
