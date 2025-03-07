import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the job subcategory',
    example: 'Electronics Store"',
  })
  name: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'parent ID',
    example: 1,
    required: false,
  })
  jobCategoryId?: number;
}
