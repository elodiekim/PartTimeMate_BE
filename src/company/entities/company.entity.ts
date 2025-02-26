import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/apis/users/entities/user.entity';
import { JobPosting } from 'src/job-postings/entities/job-posting.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  logoUrl?: string;

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.company)
  jobPostings: JobPosting[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;
}
