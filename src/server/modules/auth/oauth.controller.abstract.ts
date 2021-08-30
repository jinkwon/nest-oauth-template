import {
  Req,
  Res
} from '@nestjs/common';
import {
  DEFAULT_LEVEL,
  jwtConst
} from './constants';
import { JwtService } from '@nestjs/jwt';

export default abstract class OauthController {

  protected constructor(private jwtService: JwtService) {
  }

  async authCallback(@Req() req, @Res() res) {
    const member = req.user;
    if (member.level < DEFAULT_LEVEL) {
      return res.redirect('/?eCode=401');
    }

    const token: string = await this.jwtService.signAsync({
      name: member.name,
      email: member.email,
      level: member.level,
      oauthType: member.oauth.oauthType,
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
