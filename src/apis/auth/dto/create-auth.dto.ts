import { Column } from 'typeorm';

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LANGUAGE, USER_ROLE } from 'src/utils/enums';

export class CreateAuthDto {
  @ApiProperty({
    example: 'sample@sample.com',
    description: 'The user email address',
    required: true,
  })
  @IsString({
    message: 'The email format is invalid.',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email format is invalid.' })
  email: string;

  @ApiProperty({
    example: 'sample1234!',
    description:
      'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
    message:
      'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  })
  password: string;

  @ApiProperty({
    example: 'SUE',
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  first_name: string;

  @ApiProperty({
    example: 'KIM',
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  last_name: string;

  @ApiProperty({
    example: USER_ROLE.JOB_SEEKER,
    description: 'User role, one of: JOB_SEEKER, BUSINESS',
    enum: USER_ROLE,
  })
  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: USER_ROLE })
  role: string;

  @ApiProperty({
    example: LANGUAGE.ENG,
    description: 'Preferred language for the user interface, either eng or kor',
    enum: LANGUAGE,
  })
  @IsEnum(LANGUAGE)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: LANGUAGE })
  preferred_language: string;
}
