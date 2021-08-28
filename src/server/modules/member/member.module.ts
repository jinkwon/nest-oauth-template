import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entitiy';
import { MemberOauth } from '../../entities/member/member-oauth.entity';

@Module({
  controllers: [
    MemberController
  ],
  imports: [
    TypeOrmModule.forFeature([
      Member,
      MemberOauth,
    ])
  ],
  exports: [
    MemberService
  ],
  providers: [
    MemberService,
  ]
})
export class MemberModule {}
