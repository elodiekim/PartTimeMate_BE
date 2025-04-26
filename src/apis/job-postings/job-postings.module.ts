import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';

import { Benefit } from '../job-benefits/entities/benefit.entity';
import { JwtModule } from '@nestjs/jwt';
import { JobCategory } from '../job-categories/entities/job-category.entity';
import { Company } from '../company/entities/company.entity';
import { AdditionalOption } from './entities/additional-option.entity';
import { EmploymentType } from './entities/employment-type.entity';
import { PreferredLanguage } from './entities/preferred-language.entity';
import { WorkDay } from './entities/work-day.entity';
import { WorkHour } from './entities/work-hour.entity';
import { WorkPeriod } from './entities/work-period.entity';
import { LocationCategory } from '../locations/entities/location-category.entity';
import { LocationSubCategory } from '../locations/entities/location-sub-category.entity';
import { LocationDetail } from '../locations/entities/location-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobPosting,
      Benefit,
      JobCategory,
      Company,
      AdditionalOption,
      EmploymentType,
      PreferredLanguage,
      WorkDay,
      WorkHour,
      WorkPeriod,
      LocationCategory,
      LocationSubCategory,
      LocationDetail,
    ]),
    JwtModule,
  ],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
})
export class JobPostingsModule {}
