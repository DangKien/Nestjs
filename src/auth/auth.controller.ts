import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import JwtRefreshGuard from './login_auth/jwt-refresh.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtRefreshGuard)
  @Get('refresh/token')
  refreshTokens(@Req() req: Request) {
    // const userId = req.user['sub'];
    // const refreshToken = req.user['refreshToken'];
    // return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return await this.authService.loginFacebook(req.user);
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req): Promise<any> {
    return await this.authService.googleLogin(req.user);
  }
}
