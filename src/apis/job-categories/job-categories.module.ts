import { Module } from '@nestjs/common';
import { JobCategoriesService } from './job-categories.service';
import { JobCategoriesController } from './job-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategory } from './entities/job-category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategory, SubCategory]), JwtModule],
  controllers: [JobCategoriesController],
  providers: [JobCategoriesService],
})
export class JobCategoriesModule {}
