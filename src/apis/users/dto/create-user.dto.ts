import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";
/**테스트용입니다 
 * Auth로 뺄 것
 */

export enum USER_ROLE{
    JOB_SEEKER = 'job_seeker',
    EMPLOYER ='employer'
}
export enum Language {
    ENG = 'eng',
    KOR = 'kor', 

  }
export class CreateUserDto {


    @IsNotEmpty()
    @IsEmail({}, { message: 'The email format is invalid.' })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32) 
    @Matches(/^[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
        message: 'Password must be between 8 and 32 characters and contain letters, numbers, and special characters.',
      }) 
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)  // 첫 이름 길이 제한
    first_name: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)  // 성 길이 제한
    last_name: string;
  
    @IsEnum(USER_ROLE)
    @IsNotEmpty()
    @Column({type:'enum',enum:USER_ROLE})
    role: string;
  
    @IsEnum(Language)
    @IsNotEmpty()
    @Column({ type: 'enum', enum: Language,}) 
    preferred_language: string;
}
