import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Member } from './member.entitiy';

@Entity('member_oauth', {
  schema: 'public'
})
export class MemberOauth extends BaseEntity {
  @PrimaryGeneratedColumn()
  memberOauthId: number;

  @Column({
    nullable: false
  })
  memberId: number;

  @OneToOne(
    () => Member,
    member => member,
  )
  @JoinColumn()
  member: Member;

  @Column({
    nullable: false
  })
  oauthType: string;

  @Column({
    nullable: false
  })
  oauthId: string;

  @Column({
    nullable: false
  })
  oauthEmail: string;

  @Column({
    nullable: false
  })
  oauthToken: string;

  @Column({
    nullable: false
  })
  oauthPicture: string;

  @CreateDateColumn({
    nullable: false
  })
  createdAt?: string;

  @UpdateDateColumn({
    nullable: false
  })
  updatedAt?: string;
}
