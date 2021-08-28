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
import { jwtConst } from '../constants';

@Controller('oauth-google')
export class OauthKakaoController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly service: KakaoStrategyService
  ) {
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const member = await this.service.googleLogin(req);
    const payload = {
      name: member.name,
      email: member.email,
      level: member.level,
    };

    if (member.level <= 1) {
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
