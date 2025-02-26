import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import {
  ReadAllCompaniesDto,
  ReadCompanyDto,
} from './dto/company-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(user, createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companyRepository.create({
        ...createCompanyDto,
        user,
      });
      const savedCompany = await this.companyRepository.save(company);
      return {
        message: `Company registration successful`,
        statusCode: 201,
        data: {
          id: savedCompany.id,
          name: savedCompany.name,
          logoUrl: savedCompany.logoUrl,
          user: savedCompany.user,
          createdAt: savedCompany.createdAt,
          updatedAt: savedCompany.updatedAt,
        },
      };
    } catch (e) {
      return {
        message: `Error occurred during company registration: ${e.message}`,
        statusCode: 500,
        data: null,
      };
    }
  }

  async findByUser(user): Promise<ReadAllCompaniesDto> {
    try {
      const companies = await this.companyRepository.find({
        where: { user },
        order: { createdAt: 'DESC' },
      });
      return {
        message:
          'Successfully retrieved the list of companies registered by the user.',
        statusCode: 200,
        data: { companies },
      };
    } catch (e) {
      throw new Error(
        `Error occurred during retrieved the list of companies registered by the user${e.message}`,
      );
    }
  }
  findAll() {
    return `This action returns all company`;
  }

  async findOne(user, companyId: number): Promise<ReadCompanyDto> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id: companyId, user },
      });

      if (!company) {
        throw new NotFoundException(`Company not found.`);
      }

      return {
        message: 'Successfully retrieved the company details.',
        statusCode: 200,
        data: company,
      };
    } catch (e) {
      throw new Error(
        `Error occurred during retrieved the company details ${e.message}`,
      );
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
