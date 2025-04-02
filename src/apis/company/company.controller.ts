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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/apis/decorators/get-user.decorator';
import { User } from 'src/apis/users/entities/user.entity';
import { BusinessGuard } from 'src/apis/auth/jwt/business.guard';
import {
  ReadAllCompaniesDto,
  ReadCompanyDto,
} from './dto/company-response.dto';
import { AdminGuard } from 'src/apis/auth/jwt/admin.guard';
import { RolesGuard } from 'src/apis/auth/jwt/role.guard';

@ApiTags('Companies API')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  // ─────────────────────────────────────────────────────────
  // ✅ 비지니스 권한 유저 회사 등록 API
  // ─────────────────────────────────────────────────────────
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Register a company for users with business role' })
  @ApiResponse({ status: 201, description: 'Company successfully registered.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @GetUser() user: User,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.create(user, createCompanyDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 비지니스 권한 유저 등록한 회사 조회 API
  // ─────────────────────────────────────────────────────────
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary:
      'Retrieve all companies registered by the logged-in user with business role',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved the list of companies registered by the user',
    type: ReadAllCompaniesDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findByUser(@GetUser() user: User): Promise<ReadAllCompaniesDto> {
    return this.companyService.findByUser(user);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 비지니스 권한 유저 등록한 회사 상세 조회 API
  // ─────────────────────────────────────────────────────────
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard, AdminGuard)
  @ApiOperation({
    summary:
      'Retrieve details of a company registered by the logged-in user with business role',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the company details.',
    type: ReadCompanyDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findOne(@GetUser() user: User, @Param('id') id: number) {
    return this.companyService.findOne(user, id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 비지니스 권한 유저 등록한 회사 수정 API
  // ─────────────────────────────────────────────────────────
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, BusinessGuard, AdminGuard)
  @ApiOperation({
    summary: 'Update company information',
  })
  @ApiResponse({
    status: 200,
    description: 'Company information updated successfully.',
    type: ReadCompanyDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. You do not have permission to perform this action.',
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  // ─────────────────────────────────────────────────────────
  // ✅ 등록한 회사 삭제 API
  // ─────────────────────────────────────────────────────────

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiResponse({
    status: 200,
    description: 'Company successfully soft deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async remove(@GetUser() user: User, @Param('id') id: number) {
    return this.companyService.remove(user, id);
  }
}
