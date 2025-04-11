import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { JobPosting } from '../entities/job-posting.entity';

export class ReadAllJobPostingsDto {
  message: string;
  statusCode: number;
  data: {
    jobPostings: JobPosting[];
    totalCount: number;
    totalPage: number;
    page: number;
    // limit: number;
  };
}
export class PageRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
