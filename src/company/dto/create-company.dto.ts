import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the CEO',
    example: 'John Doe',
  })
  ceoName?: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'The website of the company',
    example: 'https://example.com',
  })
  website?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The contact email of the company',
    example: 'contact@example.com',
  })
  contactEmail?: string;
}
