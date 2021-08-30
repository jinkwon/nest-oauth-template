import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthType, DEFAULT_LEVEL, jwtConst } from '../constants';

@Controller('oauth-kakao')
export class OauthKakaoController {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  @Get()
  @UseGuards(AuthGuard(AuthType.Kakao))
  async auth(@Req() req) {
  }

  @Get('callback')
  @UseGuards(AuthGuard(AuthType.Kakao))
  async authRedirect(@Req() req, @Res() res) {
    const member = req.user;
    if (member.level < DEFAULT_LEVEL) {
      return res.redirect('/?eCode=401');
    }
    const token: string = await this.jwtService.signAsync({
      name: member.name,
      email: member.email,
      level: member.level,
    });
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
