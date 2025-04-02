import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all jobBenefits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobBenefit`;
  }

  update(id: number, updateJobBenefitDto: UpdateJobBenefitDto) {
    return `This action updates a #${id} jobBenefit`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobBenefit`;
  }
}
