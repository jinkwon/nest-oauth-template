import {
  Controller,
  Get,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtConst } from '../constants';

@Controller('/auth')
export class AuthController {

  @Get('/logout')
  logout(
    @Req() req: Request, @Res() res: Response
  ) {
    res.clearCookie(jwtConst.cookieName);
    res.redirect('/');
  }
}
