import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the company',
    example: 'My Awesome Company',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'The URL of the company logo',
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;
}
