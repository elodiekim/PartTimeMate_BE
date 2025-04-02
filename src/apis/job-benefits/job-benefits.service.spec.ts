import { Test, TestingModule } from '@nestjs/testing';
import { JobBenefitsService } from './job-benefits.service';

describe('JobBenefitsService', () => {
  let service: JobBenefitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobBenefitsService],
    }).compile();

    service = module.get<JobBenefitsService>(JobBenefitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
