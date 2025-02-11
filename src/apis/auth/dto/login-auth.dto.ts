import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { USER_ROLE } from 'src/utils/enums';

export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'example@domain.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'The password of the user. Minimum length is 6 characters.',
    example: 'password123!',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(USER_ROLE)
  @ApiProperty({
    description: 'The role of the user.',
    example: USER_ROLE.JOB_SEEKER,
  })
  role: USER_ROLE;
}
