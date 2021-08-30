import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from '../constants';
import OauthController from '../oauth.controller.abstract';

@Controller('oauth-kakao')
export class KakaoOauthController extends OauthController {
  constructor(
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  @Get()
  @UseGuards(AuthGuard(AuthType.Kakao))
  async auth(@Req() req: Request) {
  }

  @Get('callback')
  @UseGuards(AuthGuard(AuthType.Kakao))
  async authCallback(@Req() req, @Res() res) {
    await super.authCallback(req, res);
  }
}
