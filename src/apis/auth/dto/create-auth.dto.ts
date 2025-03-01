import { Column } from 'typeorm';

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
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
  //   @MinLength(8)
  //   @MaxLength(32)
  //   @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
  //     message:
  //       'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  //   })
  //   @Matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
  //     message:
  //       'Password must be 8-32 characters long and include at least one special character (!@#$%^&*).',
  //   })
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters long.',
  })
  @MaxLength(32, {
    message: 'Password is too long. It should be at most 32 characters long.',
  })
  @Matches(/.*[A-Z].*/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(/.*[a-z].*/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(/.*\d.*/, { message: 'Password must contain at least one number.' })
  @Matches(/.*[!@#$%^&*].*/, {
    message: 'Password must contain at least one special character.',
  })
  password: string;

  @ApiProperty({
    example: 'SUE',
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  firstName: string;

  @ApiProperty({
    example: 'KIM',
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lastName: string;

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
  preferredLanguage: string;

  @ApiProperty({
    example: '+821012345678',
    description: 'User phone number (optional)',
    required: false,
  })
  @IsOptional()
  //   @IsPhoneNumber(undefined, { message: 'Invalid phone number format' }) // 국가 코드 자동 감지
  //   @Matches(/^\+\d{1,3}[1-9]\d{3,13}$/, {
  //     message:
  //       'Invalid phone number format. Must start with + followed by country code and valid local number.',
  //   })
  //   @IsPhoneNumber(undefined, { message: 'Invalid phone number format.' })
  phoneNumber?: string;
}
