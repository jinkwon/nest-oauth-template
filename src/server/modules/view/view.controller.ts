import {
  Controller,
  Get,
  Res,
  Req,
  UseGuards,
  UseFilters
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ViewService } from './view.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ViewAuthFilter } from '../auth/filter/view-auth.filter';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @ApiExcludeEndpoint()
  @Get([
    '/',
    '/_next/*',
    '/assets/*'
  ])
  root(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    void handle(req, res);
  }

  @ApiExcludeEndpoint()
  @Get('*')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(ViewAuthFilter)
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    void handle(req, res);
  }
}
