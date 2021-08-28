import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('member_oauth', {
  schema: 'public'
})
export class MemberOauth extends BaseEntity {
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

  createdAt?: string;

  updatedAt?: string;
}
