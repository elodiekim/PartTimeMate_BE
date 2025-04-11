import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entities/job-posting.entity';
import { Repository } from 'typeorm';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { JobCategory } from '../job-categories/entities/job-category.entity';
import { Company } from '../company/entities/company.entity';
import {
  PageRequestDto,
  ReadAllJobPostingsDto,
} from './dto/read-job-posting.dto';

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

  // ─────────────────────────────────────────────────────────
  // ✅ jobPosting 목록 조회 API
  // ─────────────────────────────────────────────────────────
  async findAll(
    pageRequestDto: PageRequestDto,
  ): Promise<ReadAllJobPostingsDto> {
    const { page = 1 } = pageRequestDto;
    const limit = 20;
    const [jobPostings, totalCount] =
      await this.jobPostingRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['jobCategory', 'company'],
      });
    const totalPage = Math.ceil(totalCount / limit);
    return {
      statusCode: 200,
      message: 'Job postings fetched successfully',
      data: {
        jobPostings,
        totalCount,
        totalPage,
        page,
        // limit,
      },
    };
  }

  async findOne(id: number) {
    const jobPosting = await this.jobPostingRepository.findOne({
      where: { id },
      relations: ['jobCategory', 'company'],
    });
    if (!jobPosting) {
      throw new NotFoundException('Job posting not found');
    }
    return {
      statusCode: 200,
      message: 'Job posting fetched successfully',
      data: jobPosting,
    };
  }

  update(id: number, updateJobPostingDto: UpdateJobPostingDto) {
    return `This action updates a #${id} jobPosting`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPosting`;
  }
}
