import { Injectable } from '@nestjs/common';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';

@Injectable()
export class JobPostingsService {
  create(createJobPostingDto: CreateJobPostingDto) {
    return 'This action adds a new jobPosting';
  }

  findAll() {
    return `This action returns all jobPostings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPosting`;
  }

  update(id: number, updateJobPostingDto: UpdateJobPostingDto) {
    return `This action updates a #${id} jobPosting`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPosting`;
  }
}
