import { ApiProperty } from '@nestjs/swagger';
import { JobCategory } from '../entities/job-category.entity';

export class ReadAllJobCategoriesDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Successfully retrieved all job categories',
  })
  message: string;

  @ApiProperty({ description: 'HTTP status code', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'List of job categories', type: [JobCategory] })
  data: {
    categories: JobCategory[];
  };
}
