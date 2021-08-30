import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/request/create-member.dto';
import { UpdateMemberDto } from './dto/request/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from '../../repositories/member.repository';
import { Member } from '../../entities/member/member.entitiy';
import { FindManyOptions } from 'typeorm';
import { MemberOauth } from '../../entities/member/member-oauth.entity';
import { MemberOauthRepository } from '../../repositories/member-oauth.repository';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member)
    private readonly repository: MemberRepository,
    @InjectRepository(MemberOauth)
    private readonly oauthRepository: MemberOauthRepository,
  ) {

  }

  async join(memberDto: CreateMemberDto) {
    const oauth = memberDto.oauth;
    const member = await this.findOneByOauth(oauth.oauthType, oauth.oauthId);
    if (!member) {
      return await this.create(memberDto);
    } else {
      return member;
    }
  }

  async create(createDto: CreateMemberDto) {
    const member = await this.repository.create({
      name: createDto.name,
      email: createDto.email,
      level: createDto.level,
    }).save();

    const oauthMember = await this.oauthRepository.create({
      ...createDto.oauth,
      memberId: member.memberId,
    }).save();

    return member;
  }

  findAll(opt?: FindManyOptions) {
    return this.repository.find(opt);
  }

  async findOneByOauth(oauthType, oauthId) {
    const oauthMember = await this.oauthRepository.findOne({
      where: {
        oauthType,
        oauthId,
      },
    });

    if (oauthMember) {
      return await this.repository.findOne({
        where: {
          memberId: oauthMember.memberId,
        }
      });
    } else {
      return null;
    }
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email
      }
    })
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateDto: UpdateMemberDto) {
    return this.repository.update(id, updateDto);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
