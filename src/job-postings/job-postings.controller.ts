import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/apis/auth/jwt/admin.guard';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';

@ApiTags('JobPostings API')
@Controller('job-postings')
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 카테고리 등록 API
  // ─────────────────────────────────────────────────────────
  @Post('category')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Create a new job category' })
  @ApiResponse({
    status: 201,
    description: 'The job category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createCategory(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobPostingsService.createCategory(createJobCategoryDto);
  }

  @Post()
  create(@Body() createJobPostingDto: CreateJobPostingDto) {
    return this.jobPostingsService.create(createJobPostingDto);
  }

  @Get()
  findAll() {
    return this.jobPostingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
}
