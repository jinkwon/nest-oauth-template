import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @CreateDateColumn({
    nullable: false
  })
  createdAt?: string;

  @UpdateDateColumn({
    nullable: false
  })
  updatedAt?: string;
}
