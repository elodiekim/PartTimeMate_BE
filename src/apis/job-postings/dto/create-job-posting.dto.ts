import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateJobPostingDto {
  @IsString()
  @ApiProperty({
    example: 'Software Engineer',
    description: 'job title',
  })
  title: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'job category id',
  })
  jobCategoryId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'company id',
  })
  companyId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'job location Id',
  })
  locationId: number;

  @IsString()
  @ApiProperty({
    example: '$40',
    description: 'job hourly rate',
  })
  hourlyRate: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'job hourly rate negotiable',
  })
  isHourlyRateNegotiable: boolean;

  @IsString()
  @ApiProperty({
    example:
      'We are looking for a software engineer with 3 years of experience in React and Node.js.',
    description: 'job description',
  })
  description: string;

  /**category 생성 후 변경 예정 */
  @IsArray()
  @ApiProperty({
    example: ['Health insurance', 'Dental insurance', 'Vision insurance'],
    description: 'job benefits',
  })
  benefits: string[];

  @IsString()
  @ApiProperty({
    example: 'Email',
    description: 'job application method',
  })
  applicationMethod: string;

  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'job contact',
  })
  contact: string;

  @IsString()
  @ApiProperty({
    example: '2024-01-01',
    description: 'job deadline',
  })
  deadline: string;

  // 추가: 각 relation의 id 배열

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'additional option ids',
    required: false,
  })
  additionalOptionIds?: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'employment type ids',
    required: false,
  })
  employmentTypeIds?: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'preferred language ids',
    required: false,
  })
  preferredLanguageIds?: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'work day ids',
    required: false,
  })
  workDayIds?: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'work hour ids',
    required: false,
  })
  workHourIds?: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
    description: 'work period ids',
    required: false,
  })
  workPeriodIds?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'location sub category id',
    required: false,
  })
  locationSubCategoryId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'location detail id',
    required: false,
  })
  locationDetailId?: number;
}
