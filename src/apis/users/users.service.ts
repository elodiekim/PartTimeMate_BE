import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    try {
      const {
        email,
        first_name,
        last_name,
        role,
        preferred_language,
        password,
      } = createAuthDto;

      const user = this.userRepository.create({
        email,
        first_name,
        last_name,
        role,
        preferred_language,
        password,
      });

      return this.userRepository.save(user);
    } catch (e) {
      throw new Error(`Failed to create user: ${e.message}`);
    }
  }

  async findByEmail(email: string) {
    try {
      // const user = await this.userRepository.findOne({ where: { email } });

      const user = await this.userRepository.findOne({
        where: { email },
        select: [
          'id',
          'email',
          'password',
          'first_name',
          'last_name',
          'refreshToken',
        ],
      });
      return user;
    } catch (e) {
      throw new Error(`Failed to find user by email: ${e.message}`);
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    try {
      const currentTime = new Date(); // 현재 시간

      return this.userRepository.update(userId, {
        refreshToken,
        updated_at: currentTime, // updated_at 필드를 수동으로 설정
      });
    } catch (e) {
      throw new Error(`Failed to save token: ${e.message}`);
    }
  }

  findAll() {
    return `Test`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
