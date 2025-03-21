import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
          ceoName: savedCompany.ceoName,
          contactEmail: savedCompany.contactEmail,
          website: savedCompany.website,
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
  /** company patch ----> separate findOne */
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    // 엔터티의 각 필드를 개별적으로 업데이트
    company.name = updateCompanyDto.name ?? company.name;
    company.logoUrl = updateCompanyDto.logoUrl ?? company.logoUrl;
    company.ceoName = updateCompanyDto.ceoName ?? company.ceoName;
    company.website = updateCompanyDto.website ?? company.website;
    company.contactEmail =
      updateCompanyDto.contactEmail ?? company.contactEmail;

    await this.companyRepository.save(company);
    return {
      message: 'Company update successful',
      statusCode: 200,
      data: {
        id: company.id,
        name: company.name,
        logoUrl: company.logoUrl,
        ceoName: company.ceoName,
        website: company.website,
        contactEmail: company.contactEmail,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      },
    };
  }

  async remove(
    user,
    id: number,
  ): Promise<{ message: string; statusCode: number }> {
    // if (user.role === 'BUSINESS') {
    //   const company = await this.companyRepository
    //     .createQueryBuilder('company')
    //     .innerJoinAndSelect('company.user', 'user')
    //     .where('company.id = :companyId', { companyId: id })
    //     .andWhere('user.id = :userId', { userId: user.id })
    //     .getOne();

    //   if (!company) {
    //     throw new ForbiddenException(
    //       'You do not have permission to delete this company.',
    //     );
    //   }
    //   await this.companyRepository.softDelete(id);
    // }

    // if (user.role === 'ADMIN') {
    //   await this.companyRepository.softDelete(id);
    // }

    // return {
    //   message: 'Company successfully soft deleted',
    //   statusCode: 200,
    // };
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    // ADMIN 역할을 가진 사용자는 모든 회사 삭제 가능
    if (user.role === 'ADMIN') {
      await this.companyRepository.softRemove(company);
      return {
        message: 'Company successfully soft deleted by admin.',
        statusCode: 200,
      };
    }

    // BUSINESS 역할을 가진 사용자는 자신이 소유한 회사만 삭제 가능
    if (user.role === 'BUSINESS' && company.user.id === user.id) {
      await this.companyRepository.softRemove(company);
      return {
        message: 'Company successfully soft deleted by owner.',
        statusCode: 200,
      };
    }

    // 권한이 없는 경우
    throw new ForbiddenException(
      'You do not have permission to delete this company.',
    );
  }
}
