import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { IsDate, IsPhoneNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Company } from 'src/apis/company/entities/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 50, default: 'JOB_SEEKER' })
  role: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @Column({ type: 'varchar', length: 10, default: 'en' })
  preferredLanguage: string;

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
  updatedAt: Date;

  @IsDate()
  @DeleteDateColumn({
    select: false,
    type: 'timestamp',
  })
  deletedAt: Date;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];
}
