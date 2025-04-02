import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from 'src/apis/company/entities/company.entity';
import { Benefit } from '../../job-benefits/entities/benefit.entity';
import { JobCategory } from 'src/apis/job-categories/entities/job-category.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @ManyToOne(() => Company, (company) => company.jobPostings)
  company: Company;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobPostings)
  jobCategory: JobCategory;

  @Column({ length: 50, nullable: true })
  salary?: string;

  @Column({ length: 20, nullable: true })
  salaryType?: string;

  @Column({ default: false })
  salaryNegotiable: boolean;

  @Column({ length: '255', nullable: true })
  workPeriod?: string;

  @Column({ type: 'time', nullable: true })
  workHoursStart?: string;

  @Column({ type: 'time', nullable: true })
  workHoursEnd?: string;

  @Column({ type: 'simple-array', nullable: true })
  workDays?: string[];

  @Column({ length: 50, nullable: true })
  employmentType?: string;

  @Column({ length: 255, nullable: true })
  workAddress?: string;

  @Column({ length: 255, nullable: true })
  addressDetail?: string;

  @Column({ length: 50, nullable: true })
  locationCoords?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 50, nullable: true })
  contactName?: string;

  @Column({ length: 50, nullable: true })
  contactPhone?: string;

  @Column({ length: 100, nullable: true })
  contactEmail?: string;

  @Column({ length: 100, nullable: true })
  applicationMethod?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
