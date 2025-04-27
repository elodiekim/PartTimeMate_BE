import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { JobPosting } from 'src/apis/job-postings/entities/job-posting.entity';

@Entity('job_categories')
export class JobCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.jobCategory)
  jobPostings: JobPosting[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.jobCategory)
  subCategories: SubCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
