import { Module } from '@nestjs/common';
import { MemberModule } from '../member/member.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy.service';
import { GoogleStrategyService } from './oauth-google/google-strategy.service';
import { GoogleOauthController } from './oauth-google/google-oauth.controller';
import { KakaoOauthController } from './oauth-kakao/kakao-oauth.controller';
import { KakaoStrategyService } from './oauth-kakao/kakao-strategy.service';
import { NaverStrategyService } from './oauth-naver/naver-strategy.service';
import { NaverOauthController } from './oauth-naver/naver-oauth.controller';

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
    KakaoStrategyService,
    NaverStrategyService,
    JwtStrategy
  ],
  exports: [
    GoogleStrategyService,
    KakaoStrategyService,
    NaverStrategyService,
    PassportModule,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
    GoogleOauthController,
    KakaoOauthController,
    NaverOauthController,
  ],
})
export class AuthModule {}
