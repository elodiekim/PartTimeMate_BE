import { PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LANGUAGE } from 'src/utils/enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
    message:
      'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  })
  password?: string;

  @IsOptional()
  @IsEnum(LANGUAGE)
  preferred_language?: LANGUAGE;
}
