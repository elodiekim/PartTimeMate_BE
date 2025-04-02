import { PartialType } from '@nestjs/swagger';
import { CreateJobPostingDto } from './create-job-posting.dto';

export class UpdateJobPostingDto extends PartialType(CreateJobPostingDto) {}
