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
import { WorkDay } from './entities/work-day.entity';
import { WorkHour } from './entities/work-hour.entity';
import { WorkPeriod } from './entities/work-period.entity';
import { PreferredLanguage } from './entities/preferred-language.entity';
import { EmploymentType } from './entities/employment-type.entity';
import { AdditionalOption } from './entities/additional-option.entity';
@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPostingRepository: Repository<JobPosting>,
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(WorkDay)
    private readonly workDayRepository: Repository<WorkDay>,
    @InjectRepository(WorkHour)
    private readonly workHourRepository: Repository<WorkHour>,
    @InjectRepository(WorkPeriod)
    private readonly workPeriodRepository: Repository<WorkPeriod>,
    @InjectRepository(PreferredLanguage)
    private readonly preferredLanguageRepository: Repository<PreferredLanguage>,
    @InjectRepository(EmploymentType)
    private readonly employmentTypeRepository: Repository<EmploymentType>,
    @InjectRepository(AdditionalOption)
    private readonly additionalOptionRepository: Repository<AdditionalOption>,
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
  async getWorkDays() {
    const workDays = await this.workDayRepository.find();
    return {
      statusCode: 200,
      message: 'Work days fetched successfully',
      data: workDays,
    };
  }
  async getWorkHours() {
    const workHours = await this.workHourRepository.find();
    return {
      statusCode: 200,
      message: 'Work hours fetched successfully',
      data: workHours,
    };
  }
  async getWorkPeriod() {
    const workPeriod = await this.workPeriodRepository.find();
    return {
      statusCode: 200,
      message: 'Work period fetched successfully',
      data: workPeriod,
    };
  }
  async getPreferredLanguages() {
    const preferredLanguages = await this.preferredLanguageRepository.find();
    return {
      statusCode: 200,
      message: 'Preferred languages fetched successfully',
      data: preferredLanguages,
    };
  }
  async getEmploymentTypes() {
    const employmentTypes = await this.employmentTypeRepository.find();
    return {
      statusCode: 200,
      message: 'Employment types fetched successfully',
      data: employmentTypes,
    };
  }
  async getAdditionalOptions() {
    const additionalOptions = await this.additionalOptionRepository.find();
    return {
      statusCode: 200,
      message: 'Additional options fetched successfully',
      data: additionalOptions,
    };
  }
}
