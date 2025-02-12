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
import { LANGUAGE, USER_ROLE } from 'src/utils/enums';
import { Column } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'The email format is invalid.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
    message:
      'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100) // 첫 이름 길이 제한
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100) // 성 길이 제한
  last_name: string;

  @IsEnum(USER_ROLE)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: USER_ROLE })
  role: string;

  @IsEnum(LANGUAGE)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: LANGUAGE })
  preferred_language: string;

  @IsOptional()
  //   @IsPhoneNumber(undefined, { message: 'Invalid phone number format' })
  phoneNumber?: string;
}
