import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty({
    example: '$40',
    description: 'job salary',
  })
  salary: string;

  @IsString()
  @ApiProperty({
    example: 'hourly',
    description: 'job salary type',
  })
  salaryType: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'job salary negotiable',
  })
  salaryNegotiable: boolean;

  @IsString()
  @ApiProperty({
    example: '6 months',
    description: 'job work period',
  })
  workPeriod: string;

  @IsString()
  @ApiProperty({
    example: '09:00',
    description: 'job work hours start',
  })
  workHoursStart: string;

  @IsString()
  @ApiProperty({
    example: '18:00',
    description: 'job work hours end',
  })
  workHoursEnd: string;

  @IsArray()
  @ApiProperty({
    example: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    description: 'job work days',
  })
  workDays: string[];

  @IsString()
  @ApiProperty({
    example: 'Part-time',
    description: 'job employment type',
  })
  employmentType: string;

  @IsString()
  @ApiProperty({
    example: '123 Main St, Anytown, Sydney',
    description: 'job work address',
  })
  workAddress: string;

  @IsString()
  @ApiProperty({
    example: 'Sydney',
    description: 'job address detail',
  })
  addressDetail: string;

  @IsString()
  @ApiProperty({
    example: '-33.8688, 151.2153',
    description: 'job location coords',
  })
  locationCoords: string;

  @IsString()
  @ApiProperty({
    example:
      'We are looking for a software engineer with 3 years of experience in React and Node.js.',
    description: 'job description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: 'John Doe',
    description: 'job contact name',
  })
  contactName: string;

  @IsString()
  @ApiProperty({
    example: '+611012345678',
    description: 'job contact phone',
  })
  contactPhone: string;

  @IsString()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'job contact email',
  })
  contactEmail: string;

  @IsString()
  @ApiProperty({
    example: 'Email',
    description: 'job application method',
  })
  applicationMethod: string;
}
