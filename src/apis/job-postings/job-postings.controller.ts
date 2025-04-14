import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessGuard } from '../auth/jwt/business.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { PageRequestDto } from './dto/read-job-posting.dto';
import { ReadAllJobPostingsDto } from './dto/read-job-posting.dto';

@ApiTags('JobPostings API')
@Controller('job-postings')
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}
  // ─────────────────────────────────────────────────────────
  // ✅ jobPosting 생성 API
  // ─────────────────────────────────────────────────────────
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard)
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({
    status: 201,
    description: 'The job posting has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createJobPostingDto: CreateJobPostingDto) {
    // console.log(createJobPostingDto);
    return this.jobPostingsService.create(createJobPostingDto);
  }

  // ─────────────────────────────────────────────────────────
  // ✅ jobPosting 목록 조회 API
  // ─────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'Get all job postings' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all job postings.',
    type: ReadAllJobPostingsDto,
  })
  async findAll(@Query() pageRequestDto: PageRequestDto) {
    return this.jobPostingsService.findAll(pageRequestDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ jobPosting 상세 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('detail/:id')
  @ApiOperation({ summary: 'Get a job posting by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the job posting.',
  })
  async findOne(@Param('id') id: string) {
    return this.jobPostingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ) {
    return this.jobPostingsService.update(+id, updateJobPostingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPostingsService.remove(+id);
  }

  // ─────────────────────────────────────────────────────────
  //  ✅ work-day 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('work-day')
  @ApiOperation({ summary: 'Get all work days' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all work days.',
  })
  async getWorkDays() {
    return this.jobPostingsService.getWorkDays();
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ work-hour 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('work-hour')
  @ApiOperation({ summary: 'Get all work hours' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all work hours.',
  })
  async getWorkHours() {
    return this.jobPostingsService.getWorkHours();
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ work-period 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('work-period')
  @ApiOperation({ summary: 'Get all work periods' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all work periods.',
  })
  async getWorkPeriod() {
    return this.jobPostingsService.getWorkPeriod();
  }

  // ─────────────────────────────────────────────────────────
  //  ✅ preferred-language 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('preferred-language')
  @ApiOperation({ summary: 'Get all preferred languages' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all preferred languages.',
  })
  async getPreferredLanguages() {
    return this.jobPostingsService.getPreferredLanguages();
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ employment-type 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('employment-type')
  @ApiOperation({ summary: 'Get all employment types' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all employment types.',
  })
  async getEmploymentTypes() {
    return this.jobPostingsService.getEmploymentTypes();
  }
  // ─────────────────────────────────────────────────────────
  //  ✅ additional-option 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('additional-option')
  @ApiOperation({ summary: 'Get all additional options' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all additional options.',
  })
  async getAdditionalOptions() {
    return this.jobPostingsService.getAdditionalOptions();
  }
}
