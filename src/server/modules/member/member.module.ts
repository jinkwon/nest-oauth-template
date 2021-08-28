import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entitiy';

@Module({
  controllers: [
    MemberController
  ],
  imports: [
    TypeOrmModule.forFeature([Member])
  ],
  exports: [
    MemberService
  ],
  providers: [
    MemberService,
  ]
})
export class MemberModule {}
