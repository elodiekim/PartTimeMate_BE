import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { IsDate } from 'class-validator';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', length: 10, default: 'en' })
  preferred_language: string;

  @IsDate()
  @CreateDateColumn({
    type: 'timestamp',
    // select: false, // 쿼리에서 이 필드를 제외하고 싶을 때 사용
  })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @IsDate()
  @DeleteDateColumn({
    select: false,
    type: 'timestamp',
  })
  deletedAt: Date;
}
