import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
} from 'passport-google-oauth20';
import { config } from 'dotenv';
import ENV from '../../../env';
import { MemberService } from '../../member/member.service';
import { AuthType, DEFAULT_LEVEL } from '../constants';
import { CreateMemberDto } from '../../member/dto/request/create-member.dto';

config();

@Injectable()
export class GoogleStrategyService extends PassportStrategy(Strategy, AuthType.Google) {

  constructor(
    private readonly memberService: MemberService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${ENV.host}/oauth-google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const memberDto: CreateMemberDto = {
      email: profile?.emails[0].value,
      name: `${profile?.displayName || [profile?.name.givenName, profile?.name.familyName].join(' ')}`,
      level: DEFAULT_LEVEL,
      oauth: {
        oauthPicture: profile?.photos[0].value,
        oauthId: profile.id,
        oauthEmail: profile?.emails[0].value,
        oauthType: AuthType.Google,
        oauthToken: accessToken,
      }
    }
    return await this.memberService.join(memberDto);
  }
}
