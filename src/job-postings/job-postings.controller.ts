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
import { ReadAllJobCategoriesDto } from './dto/job-category-response.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';

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

  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 서브 카테고리 등록 API
  // ─────────────────────────────────────────────────────────
  @Post('subcategory')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Create a new job subcategory' })
  @ApiResponse({
    status: 201,
    description: 'The job subcategory has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.jobPostingsService.createSubCategory(createSubCategoryDto);
  }

  // ─────────────────────────────────────────────────────────
  // ✅ 카테고리 전체 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('category')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all job categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all job categories',
    type: ReadAllJobCategoriesDto,
  })
  findAllCategories() {
    return this.jobPostingsService.findAllCategories();
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 카테고리별 서브카테고리 조회 API
  // ─────────────────────────────────────────────────────────
  @Get('category/:id/subcategories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve subcategories by category ID' })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved subcategories for the given category ID',
  })
  @ApiResponse({
    status: 404,
    description: 'No subcategories found for the given category ID.',
  })
  async findSubCategoriesByCategoryId(@Param('id') id: number) {
    return this.jobPostingsService.findSubCategoriesByCategoryId(id);
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
