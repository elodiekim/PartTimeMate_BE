import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBenefitDto } from './create-job-benefit.dto';

export class UpdateJobBenefitDto extends PartialType(CreateJobBenefitDto) {}
