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
import { JobBenefitsService } from './job-benefits.service';
import { CreateJobBenefitDto } from './dto/create-job-benefit.dto';
import { UpdateJobBenefitDto } from './dto/update-job-benefit.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AdminGuard } from '../auth/jwt/admin.guard';
import { BusinessGuard } from '../auth/jwt/business.guard';

@ApiTags('JobBenefits API')
@Controller('job-benefits')
export class JobBenefitsController {
  constructor(private readonly jobBenefitsService: JobBenefitsService) {}
  // ─────────────────────────────────────────────────────────
  // ✅ benefit 등록 API
  // ─────────────────────────────────────────────────────────
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard)
  @ApiOperation({ summary: 'Create a new job benefit' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new job benefit.',
  })
  async create(@Body() createJobBenefitDto: CreateJobBenefitDto) {
    return this.jobBenefitsService.create(createJobBenefitDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ benefit 전체 조회 API
  // ─────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'Get all job benefits' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all job benefits.',
  })
  async findAll() {
    return this.jobBenefitsService.findAll();
  }
  // ─────────────────────────────────────────────────────────
  // ✅ benefit 상세 조회 API
  // ─────────────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Get a job benefit by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved a job benefit by ID.',
  })
  async findOne(@Param('id') id: number) {
    return this.jobBenefitsService.findOne(id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ benefit 수정 API
  // ─────────────────────────────────────────────────────────

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard)
  @ApiOperation({ summary: 'Update a job benefit' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated a job benefit.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateJobBenefitDto: UpdateJobBenefitDto,
  ) {
    return this.jobBenefitsService.update(id, updateJobBenefitDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ benefit 삭제 API
  // ─────────────────────────────────────────────────────────
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard)
  @ApiOperation({ summary: 'Delete a job benefit' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a job benefit.',
  })
  async remove(@Param('id') id: number) {
    return this.jobBenefitsService.remove(id);
  }
}
