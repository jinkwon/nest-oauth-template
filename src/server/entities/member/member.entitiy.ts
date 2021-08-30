import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { MemberOauth } from './member-oauth.entity';

@Entity('member', {
  schema: 'public'
})
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  memberId: number;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  email: string;

  @Column({
    nullable: false,
    default: 1,
  })
  level: number;

  @OneToMany(
    () => MemberOauth,
    (oauth) => oauth,
  )
  memberOauthList!: MemberOauth[];

  @CreateDateColumn({
    nullable: false
  })
  createdAt!: string;

  @UpdateDateColumn({
    nullable: false
  })
  updatedAt!: string;
}
