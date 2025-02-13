import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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
        phoneNumber,
      } = createAuthDto;

      const user = this.userRepository.create({
        email,
        first_name,
        last_name,
        role,
        preferred_language,
        password,
        phoneNumber,
      });

      return this.userRepository.save(user);
    } catch (e) {
      throw new Error(`Failed to create user: ${e.message}`);
    }
  }
  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'email',
        'first_name',
        'last_name',
        'role',
        'preferred_language',
        'createdAt',
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getMe(user: User) {
    const data = await this.findOne(user.id);

    return {
      message: 'User information successfully fetched',
      statusCode: 200,
      data,
    };
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
          'role',
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
      const currentTime = new Date();

      return this.userRepository.update(userId, {
        refreshToken,
        updated_at: currentTime, // updated_at 필드를 수동으로 설정
      });
    } catch (e) {
      throw new Error(`Failed to save token: ${e.message}`);
    }
  }

  async updateMe(user: User, updateUserDto: UpdateUserDto): Promise<any> {
    const { password, preferred_language, phoneNumber, first_name, last_name } =
      updateUserDto;

    const existingUser = await this.findOne(user.id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    let isUpdated = false;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      isUpdated = true;
    }

    if (preferred_language) {
      existingUser.preferred_language = preferred_language;
      isUpdated = true;
    }

    if (phoneNumber) {
      existingUser.phoneNumber = phoneNumber;
      isUpdated = true;
    }

    if (first_name) {
      existingUser.first_name = first_name;
      isUpdated = true;
    }

    if (last_name) {
      existingUser.last_name = last_name;
      isUpdated = true;
    }

    if (!isUpdated) {
      throw new BadRequestException('At least one field must be provided.');
    }

    const updatedUser = await this.userRepository.save(existingUser);

    return {
      message: 'User information successfully updated',
      statusCode: 200,
      // data: updatedUser,
    };
  }
  findAll() {
    return `Test`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
