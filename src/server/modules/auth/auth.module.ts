import { Module } from '@nestjs/common';
import { GoogleStrategyService } from './oauth-google/google-strategy.service';
import { OauthGoogleController } from './oauth-google/oauth-google.controller';
import { MemberModule } from '../member/member.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy.service';
import { OauthKakaoController } from './oauth-kakao/oauth-kakao.controller';
import { KakaoStrategyService } from './oauth-kakao/kakao-strategy.service';

@Module({
  imports: [
    MemberModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: jwtConst.expiresIn },
    }),
  ],
  providers: [
    GoogleStrategyService,
    // KakaoStrategyService,
    JwtStrategy
  ],
  exports: [
    GoogleStrategyService,
    // KakaoStrategyService,
    PassportModule,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
    OauthGoogleController,
    // OauthKakaoController,
  ],
})
export class AuthModule {}
