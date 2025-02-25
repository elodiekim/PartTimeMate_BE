import { IsString } from 'class-validator';

export class ConfirmPasswordDto {
  @IsString()
  password: string;
}
