import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';

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

      // 사용자 정보 생성
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

  // 이메일로 사용자 찾기
  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return !!user;
    } catch (e) {
      throw new Error(`Failed to find user by email: ${e.message}`);
    }
  }
  findAll() {
    return `This action returns all users`;
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
