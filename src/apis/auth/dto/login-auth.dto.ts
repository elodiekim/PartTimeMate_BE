import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
}
