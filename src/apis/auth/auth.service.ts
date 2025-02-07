import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  /**
   * SIGN UP
   * @param createAuthDto
   */
  async signUp(createAuthDto: CreateAuthDto): Promise<{
    message: string;
    statusCode: number;
    data: {
      email: string;
      name: string;
    } | null;
  }> {
    try {
      // 이메일로 이미 존재하는 사용자가 있는지 체크
      const existingUser = await this.usersService.findByEmail(
        createAuthDto.email,
      );
      if (existingUser) {
        return {
          message: 'User with this email already exists.',
          statusCode: 400,
          data: null,
        };
      }

      const { password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      createAuthDto.password = hashPassword;

      const newUser = await this.usersService.create(createAuthDto);

      return {
        message: 'User created successfully.',
        statusCode: 201,
        data: {
          email: newUser.email,
          name: `${newUser.first_name} ${newUser.last_name}`,
        },
      };
    } catch (e) {
      return {
        message: `Error occurred during sign up: ${e.message}`,
        statusCode: 500,
        data: null,
      };
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
