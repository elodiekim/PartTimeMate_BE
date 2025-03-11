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
import { JobCategoriesService } from './job-categories.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';
import { AdminGuard } from 'src/apis/auth/jwt/admin.guard';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { ReadAllJobCategoriesDto } from './dto/job-category-response.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@ApiTags('JobCategories API')
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 카테고리 등록 API
  // ─────────────────────────────────────────────────────────
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Create a new job category' })
  @ApiResponse({
    status: 201,
    description: 'The job category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createCategory(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoriesService.createCategory(createJobCategoryDto);
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
    return this.jobCategoriesService.createSubCategory(createSubCategoryDto);
  }

  // ─────────────────────────────────────────────────────────
  // ✅ 카테고리 전체 조회 API
  // ─────────────────────────────────────────────────────────
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all job categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all job categories',
    type: ReadAllJobCategoriesDto,
  })
  findAllCategories() {
    return this.jobCategoriesService.findAllCategories();
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 카테고리별 서브카테고리 조회 API
  // ─────────────────────────────────────────────────────────
  @Get(':id/subcategories')
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
    return this.jobCategoriesService.findSubCategoriesByCategoryId(id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 카테고리 수정 API
  // ─────────────────────────────────────────────────────────
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Update a job category' })
  @ApiResponse({
    status: 200,
    description: 'The job category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Job category not found.' })
  update(
    @Param('id') id: number,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoriesService.update(id, updateJobCategoryDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 서브카테고리 수정 API
  // ─────────────────────────────────────────────────────────
  @Patch('subcategory/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Update a job subcategory' })
  @ApiResponse({
    status: 200,
    description: 'The job subcategory has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'SubCategory not found.' })
  updateSubCategory(
    @Param('id') id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.jobCategoriesService.updateSubCategory(
      id,
      updateSubCategoryDto,
    );
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 카테고리 삭제 API
  // ─────────────────────────────────────────────────────────
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobCategoriesService.remove(+id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 관리자 권한 서브카테고리 삭제 API
  // ─────────────────────────────────────────────────────────
  @Delete('subcategory/:id')
  async removeSubCategory(@Param('id') id: number) {
    return this.jobCategoriesService.removeSubCategory(+id);
  }
}
