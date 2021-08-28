import {
  EntityRepository,
  Repository
} from 'typeorm';
import { Member } from '../entities/member/member.entitiy';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
}
