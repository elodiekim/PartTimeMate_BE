import { ApiProperty } from '@nestjs/swagger';
import { SubCategory } from '../entities/sub-category.entity';

export class ReadAllSubCategoriesDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Successfully retrieved all job sub categories',
  })
  message: string;

  @ApiProperty({ description: 'HTTP status code', example: 200 })
  statusCode: number;

  @ApiProperty({
    description: 'List of job sub categories',
    type: [SubCategory],
  })
  data: {
    subCategories: SubCategory[];
  };
}
