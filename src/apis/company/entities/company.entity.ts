import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/apis/users/entities/user.entity';
import { JobPosting } from 'src/apis/job-postings/entities/job-posting.entity';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  ceoName?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactEmail?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;
}
