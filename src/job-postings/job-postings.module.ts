import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';

import { JobCategory } from './entities/job-category.entity';
import { Benefit } from './entities/benefit.entity';
import { JwtModule } from '@nestjs/jwt';
import { SubCategory } from './entities/sub-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPosting, JobCategory, Benefit, SubCategory]),
    JwtModule,
  ],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
})
export class JobPostingsModule {}
