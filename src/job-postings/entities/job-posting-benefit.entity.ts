import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { Benefit } from './benefit.entity';

@Entity('job_posting_benefits')
export class JobPostingBenefit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.jobPostingBenefits, {
    onDelete: 'CASCADE',
  })
  jobPosting: JobPosting;

  @ManyToOne(() => Benefit, (benefit) => benefit.jobPostingBenefits, {
    onDelete: 'CASCADE',
  })
  benefit: Benefit;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
