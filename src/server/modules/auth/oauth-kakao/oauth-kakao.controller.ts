import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KakaoStrategyService } from './kakao-strategy.service';
import { JwtService } from '@nestjs/jwt';
import { DEFAULT_LEVEL, jwtConst } from '../constants';

@Controller('oauth-kakao')
export class OauthKakaoController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly service: KakaoStrategyService
  ) {
  }

  @Get()
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
  }

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req, @Res() res) {
    const member = await this.service.kakaoLogin(req);
    const payload = {
      name: member.name,
      email: member.email,
      level: member.level,
    };

    if (member.level < DEFAULT_LEVEL) {
      return res.redirect('/?eCode=401');
    }

    const token: string = await this.jwtService.signAsync(payload);
    const secretData = {
      token,
      refreshToken: '',
    };
    res.cookie(jwtConst.cookieName, secretData, {
      httpOnly: true,
    });

    const rst = {
      member,
      accessToken: token,
    };
    if (!rst) {
      return res.redirect('/');
    }
    return res.redirect('/main');
  }
}
