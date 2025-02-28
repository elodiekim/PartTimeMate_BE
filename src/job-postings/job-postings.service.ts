import { Injectable } from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';
import { Repository } from 'typeorm';
import { JobCategory } from './entities/job-category.entity';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { ReadAllJobCategoriesDto } from './dto/job-category-response.dto';

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
  ) {}
  async createCategory(createJobCategoryDto: CreateJobCategoryDto) {
    const jobCategory =
      await this.jobCategoryRepository.create(createJobCategoryDto);
    const savedCategory = await this.jobCategoryRepository.save(jobCategory);
    return {
      message: `JobCategory registration successful`,
      statusCode: 201,
      data: {
        id: savedCategory.id,
        name: savedCategory.name,
        createdAt: savedCategory.createdAt,
        updatedAt: savedCategory.updatedAt,
      },
    };
  }

  create(createJobPostingDto: CreateJobPostingDto) {
    return 'This action adds a new jobPosting';
  }

  async findAllCategories(): Promise<ReadAllJobCategoriesDto> {
    const categories = await this.jobCategoryRepository.find({
      order: { name: 'ASC' },
    });
    return {
      message: 'Successfully retrieved all job categories',
      statusCode: 200,
      data: { categories },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPosting`;
  }

  update(id: number, updateJobPostingDto: UpdateJobPostingDto) {
    return `This action updates a #${id} jobPosting`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPosting`;
  }
}
