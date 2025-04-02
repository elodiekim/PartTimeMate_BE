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

  @Get()
  findAll() {
    return this.jobBenefitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobBenefitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobBenefitDto: UpdateJobBenefitDto,
  ) {
    return this.jobBenefitsService.update(+id, updateJobBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobBenefitsService.remove(+id);
  }
}
