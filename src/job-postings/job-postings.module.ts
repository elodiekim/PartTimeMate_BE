import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';
import { JobPostingBenefit } from './entities/job-posting-benefit.entity';
import { JobCategory } from './entities/job-category.entity';
import { Company } from './entities/company.entity';
import { Benefit } from './entities/benefit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobPosting,
      JobPostingBenefit,
      JobCategory,
      Company,
      Benefit,
    ]),
  ],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
})
export class JobPostingsModule {}
