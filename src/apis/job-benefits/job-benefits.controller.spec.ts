import { Test, TestingModule } from '@nestjs/testing';
import { JobBenefitsController } from './job-benefits.controller';
import { JobBenefitsService } from './job-benefits.service';

describe('JobBenefitsController', () => {
  let controller: JobBenefitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobBenefitsController],
      providers: [JobBenefitsService],
    }).compile();

    controller = module.get<JobBenefitsController>(JobBenefitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
