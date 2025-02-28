import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJobCategoryDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the job category',
    example: 'Software Development',
  })
  name: string;
}
