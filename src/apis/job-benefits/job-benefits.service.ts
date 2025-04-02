import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobBenefitDto } from './dto/create-job-benefit.dto';
import { UpdateJobBenefitDto } from './dto/update-job-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Benefit } from './entities/benefit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobBenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private readonly benefitRepository: Repository<Benefit>,
  ) {}

  async create(createJobBenefitDto: CreateJobBenefitDto) {
    const benefit = this.benefitRepository.create(createJobBenefitDto);
    const savedBenefit = await this.benefitRepository.save(benefit);

    return {
      message: 'JobBenefit registration successful',
      statusCode: 201,
      data: {
        id: savedBenefit.id,
        name: savedBenefit.name,
        createdAt: savedBenefit.createdAt,
        updatedAt: savedBenefit.updatedAt,
      },
    };
  }

  async findAll() {
    const benefits = await this.benefitRepository.find({
      order: { name: 'ASC' },
    });
    return {
      message: 'Successfully retrieved all jobBenefits',
      statusCode: 200,
      data: { benefits },
    };
  }

  async findBenefit(id: number) {
    const benefit = await this.benefitRepository.findOne({
      where: { id },
    });

    if (!benefit) {
      throw new NotFoundException(`JobBenefit with ID ${id} not found.`);
    }
    return benefit;
  }
  async findOne(id: number) {
    const benefit = await this.findBenefit(id);

    return {
      message: 'Successfully retrieved a job benefit',
      statusCode: 200,
      data: {
        id: benefit.id,
        name: benefit.name,
        createdAt: benefit.createdAt,
        updatedAt: benefit.updatedAt,
      },
    };
  }

  async update(id: number, updateJobBenefitDto: UpdateJobBenefitDto) {
    const benefit = await this.findBenefit(id);

    await this.benefitRepository.update(id, updateJobBenefitDto);

    return {
      message: 'JobBenefit updated successfully',
      statusCode: 200,
      data: {
        id: benefit.id,
        name: benefit.name,
        createdAt: benefit.createdAt,
        updatedAt: benefit.updatedAt,
      },
    };
  }

  async remove(id: number) {
    const benefit = await this.findBenefit(id);

    await this.benefitRepository.softRemove(benefit);

    return {
      message: 'JobBenefit successfully soft deleted',
      statusCode: 200,
    };
  }
}
