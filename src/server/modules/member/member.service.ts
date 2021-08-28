import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/request/create-member.dto';
import { UpdateMemberDto } from './dto/request/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from '../../repositories/member.repository';
import { Member } from '../../entities/member/member.entitiy';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member)
    private readonly repository: MemberRepository,
  ) {

  }

  create(createDto: CreateMemberDto) {
    return this.repository.create(createDto).save();
  }

  findAll(opt?: FindManyOptions) {
    return this.repository.find(opt);
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
