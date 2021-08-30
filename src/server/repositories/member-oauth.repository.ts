import {
  EntityRepository,
  Repository
} from 'typeorm';
import { MemberOauth } from '../entities/member/member-oauth.entity';

@EntityRepository(MemberOauth)
export class MemberOauthRepository extends Repository<MemberOauth> {
}
