import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';

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
import { LocationCategory } from '../locations/entities/location-category.entity';
import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationSubCategory } from '../locations/entities/location-sub-category.entity';
import { LocationDetail } from '../locations/entities/location-detail.entity';
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
    @InjectRepository(LocationCategory)
    private readonly locationCategoryRepository: Repository<LocationCategory>,
    @InjectRepository(LocationSubCategory)
    private readonly locationSubCategoryRepository: Repository<LocationSubCategory>,
    @InjectRepository(LocationDetail)
    private readonly locationDetailRepository: Repository<LocationDetail>,
  ) {}
  async create(createJobPostingDto: CreateJobPostingDto) {
    const {
      companyId,
      jobCategoryId,
      locationId,
      locationSubCategoryId,
      locationDetailId,
      additionalOptionIds,
      employmentTypeIds,
      preferredLanguageIds,
      workDayIds,
      workHourIds,
      workPeriodIds,
      title,
      hourlyRate,
      isHourlyRateNegotiable,
      description,
      benefits,
      applicationMethod,
      contact,
      deadline,
    } = createJobPostingDto;

    const jobCategory = await this.jobCategoryRepository.findOne({
      where: { id: jobCategoryId },
    });

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!jobCategory) {
      throw new NotFoundException('Job category not found');
    }
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const location = locationId
      ? await this.locationCategoryRepository.findOne({
          where: { id: locationId },
        })
      : undefined;

    const locationSubCategory = locationSubCategoryId
      ? await this.locationSubCategoryRepository.findOne({
          where: { id: locationSubCategoryId },
        })
      : undefined;

    const locationDetail = locationDetailId
      ? await this.locationDetailRepository.findOne({
          where: { id: locationDetailId },
        })
      : undefined;

    const jobPosting = this.jobPostingRepository.create({
      title,
      hourlyRate,
      isHourlyRateNegotiable,
      description,
      benefits,
      applicationMethod,
      contact,
      deadline,
      jobCategory,
      company,
      ...(location ? { locationCategory: location } : {}),
      ...(locationSubCategory ? { locationSubCategory } : {}),
      ...(locationDetail ? { locationDetail } : {}),
      additionalOptionIds: dedupeAndSort(additionalOptionIds),
      employmentTypeIds: dedupeAndSort(employmentTypeIds),
      preferredLanguageIds: dedupeAndSort(preferredLanguageIds),
      workDayIds: dedupeAndSort(workDayIds),
      workHourIds: dedupeAndSort(workHourIds),
      workPeriodIds: dedupeAndSort(workPeriodIds),
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
  private async getNamesByIds<T extends { id: number | string; name: string }>(
    repo: Repository<T>,
    ids?: (number | string)[],
  ): Promise<string[]> {
    if (!ids || !ids.length) return [];
    const entities = await repo.find({
      where: { id: In(ids.map(Number)) } as any,
    });
    return entities.map((e) => e.name);
  }
  async findOne(id: number) {
    const jobPosting = await this.jobPostingRepository.findOne({
      where: { id },
      relations: [
        'jobCategory',
        'company',
        'locationCategory',
        'locationSubCategory',
        'locationDetail',
      ],
    });
    if (!jobPosting) {
      throw new NotFoundException('Job posting not found');
    }

    // id 배열을 name 배열로 변환 (헬퍼 함수 활용)
    const additionalOptionNames = await this.getNamesByIds(
      this.additionalOptionRepository,
      jobPosting.additionalOptionIds,
    );
    const employmentTypeNames = await this.getNamesByIds(
      this.employmentTypeRepository,
      jobPosting.employmentTypeIds,
    );
    const preferredLanguageNames = await this.getNamesByIds(
      this.preferredLanguageRepository,
      jobPosting.preferredLanguageIds,
    );
    const workDayNames = await this.getNamesByIds(
      this.workDayRepository,
      jobPosting.workDayIds,
    );
    const workHourNames = await this.getNamesByIds(
      this.workHourRepository,
      jobPosting.workHourIds,
    );
    const workPeriodNames = await this.getNamesByIds(
      this.workPeriodRepository,
      jobPosting.workPeriodIds,
    );

    return {
      statusCode: 200,
      message: 'Job posting fetched successfully',
      data: {
        id: jobPosting.id,
        title: jobPosting.title,
        hourlyRate: jobPosting.hourlyRate,
        isHourlyRateNegotiable: jobPosting.isHourlyRateNegotiable,
        description: jobPosting.description,
        benefits: jobPosting.benefits,
        applicationMethod: jobPosting.applicationMethod,
        contact: jobPosting.contact,
        deadline: jobPosting.deadline,
        createdAt: jobPosting.createdAt,
        updatedAt: jobPosting.updatedAt,
        jobCategory: jobPosting.jobCategory,
        company: jobPosting.company,
        locationCategory: jobPosting.locationCategory,
        locationSubCategory: jobPosting.locationSubCategory,
        locationDetail: jobPosting.locationDetail,
        additionalOptionNames,
        employmentTypeNames,
        preferredLanguageNames,
        workDayNames,
        workHourNames,
        workPeriodNames,
      },
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

function dedupeAndSort(arr?: (number | string)[]): number[] {
  return arr ? Array.from(new Set(arr.map(Number))).sort((a, b) => a - b) : [];
}
