import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from 'src/apis/company/entities/company.entity';
import { Benefit } from '../../job-benefits/entities/benefit.entity';
import { JobCategory } from 'src/apis/job-categories/entities/job-category.entity';
import { LocationCategory } from 'src/apis/locations/entities/location-category.entity';
import { WorkPeriod } from './work-period.entity';
import { WorkHour } from './work-hour.entity';
import { WorkDay } from './work-day.entity';
import { PreferredLanguage } from './preferred-language.entity';
import { EmploymentType } from './employment-type.entity';
import { AdditionalOption } from './additional-option.entity';
import { LocationSubCategory } from 'src/apis/locations/entities/location-sub-category.entity';
import { LocationDetail } from 'src/apis/locations/entities/location-detail.entity';

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

  @ManyToOne(
    () => LocationCategory,
    (locationCategory) => locationCategory.jobPostings,
  )
  locationCategory: LocationCategory;

  @ManyToOne(() => LocationSubCategory, { nullable: true })
  locationSubCategory?: LocationSubCategory;

  @ManyToOne(() => LocationDetail, { nullable: true })
  locationDetail?: LocationDetail;

  @Column({ length: 100, nullable: true })
  hourlyRate?: string;

  @Column({ default: false })
  isHourlyRateNegotiable: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'simple-array', nullable: true })
  benefits?: string[];

  @Column({ length: 100, nullable: true })
  applicationMethod?: string;

  @Column({ length: 100, nullable: true })
  contact?: string;

  @Column({ length: 100, nullable: true })
  deadline?: string;

  // @ManyToMany(() => AdditionalOption)
  // @JoinTable()
  // additionalOptions: AdditionalOption[];

  // @ManyToMany(() => EmploymentType)
  // @JoinTable()
  // employmentTypes: EmploymentType[];

  // @ManyToMany(() => PreferredLanguage)
  // @JoinTable()
  // preferredLanguages: PreferredLanguage[];

  // @ManyToMany(() => WorkDay)
  // @JoinTable()
  // workDays: WorkDay[];

  // @ManyToMany(() => WorkHour)
  // @JoinTable()
  // workHours: WorkHour[];

  // @ManyToMany(() => WorkPeriod)
  // @JoinTable()
  // workPeriods: WorkPeriod;
  @Column('simple-array', { nullable: true })
  additionalOptionIds?: number[];

  @Column('simple-array', { nullable: true })
  employmentTypeIds?: number[]; // 예: [1,2]

  @Column('simple-array', { nullable: true })
  preferredLanguageIds?: number[]; // 예: [1,2]

  @Column('simple-array', { nullable: true })
  workDayIds?: number[]; // 예: [1,2]

  @Column('simple-array', { nullable: true })
  workHourIds?: number[]; // 예: [1,2]

  @Column('simple-array', { nullable: true })
  workPeriodIds?: number[]; // 예: [1,2]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
