import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPostingBenefit } from './job-posting-benefit.entity';

@Entity('benefits')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(
    () => JobPostingBenefit,
    (jobPostingBenefit) => jobPostingBenefit.benefit,
  )
  jobPostingBenefits: JobPostingBenefit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
