import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobCategory } from '../job-categories/entities/job-category.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createJobPostingDto: CreateJobPostingDto) {
    const { companyId, jobCategoryId, ...jobPostingData } = createJobPostingDto;
    const jobCategory = await this.jobCategoryRepository.findOne({
      where: { id: jobCategoryId },
    });
    // console.log(jobCategory);
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    // console.log(company);
    if (!jobCategory) {
      throw new NotFoundException('Job category not found');
    }
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const jobPosting = this.jobPostingRepository.create({
      ...jobPostingData,
      jobCategory,
      company,
    });
    return this.jobPostingRepository.save(jobPosting);
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
