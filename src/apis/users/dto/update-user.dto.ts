import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LANGUAGE, USER_ROLE } from 'src/utils/enums';
import { Roles } from 'src/apis/decorators/roles.decorator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  lastName?: string;

  @ApiPropertyOptional({
    example: 'newpassword123!',
    description:
      'New password (8~32 characters, must include letters, numbers, and special characters).',
  })
  @IsString()
  @IsOptional()
  // @MinLength(8)
  // @MaxLength(32)
  // @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
  //   message:
  //     'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  // })
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
  password?: string;

  @ApiPropertyOptional({
    example: 'KOR',
    description:
      'Preferred language (e.g., "ENG" for English, "KOR" for Korean).',
    enum: LANGUAGE,
  })
  @IsEnum(LANGUAGE)
  @IsOptional()
  preferredLanguage?: LANGUAGE;

  @ApiPropertyOptional({
    example: '+821012341234',
    description: 'User phone number in international format.',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'admin',
    description:
      'User role (either "JOB_SEEKER" or "BUSINESS"). Only for admins.',
    enum: USER_ROLE,
  })
  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: USER_ROLE;
}
