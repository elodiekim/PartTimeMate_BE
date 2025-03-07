import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { SubCategory } from './sub-category.entity';

@Entity('job_categories')
export class JobCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  //   @OneToMany(() => JobPosting, (jobPosting) => jobPosting.jobCategory)
  //   jobPostings: JobPosting[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.jobCategory)
  subCategories: SubCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
