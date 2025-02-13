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
import { SafeUser, UpdatedUserResponse } from './types/user-response.interface';
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
        firstName,
        lastName,
        role,
        preferredLanguage,
        password,
        phoneNumber,
      } = createAuthDto;

      const user = this.userRepository.create({
        email,
        firstName,
        lastName,
        role,
        preferredLanguage,
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
        'firstName',
        'lastName',
        'role',
        'preferredLanguage',
        'createdAt',
        'phoneNumber',
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
          'firstName',
          'lastName',
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
        updatedAt: currentTime, // updated_at 필드를 수동으로 설정
      });
    } catch (e) {
      throw new Error(`Failed to save token: ${e.message}`);
    }
  }

  async updateMe(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    const existingUser = await this.findOne(user.id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // 업데이트 가능한 필드 목록
    const fieldsToUpdate: (keyof UpdateUserDto)[] = [
      'password',
      'preferredLanguage',
      'phoneNumber',
      'firstName',
      'lastName',
    ];

    // updatableFields에 비밀번호만 해싱해서 추가
    const updatableFields: Partial<User> = {};

    if (updateUserDto.password) {
      updatableFields.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // 나머지 필드 업데이트
    fieldsToUpdate.forEach((field) => {
      if (field !== 'password' && updateUserDto[field] !== undefined) {
        updatableFields[field] = updateUserDto[field];
      }
    });

    // 변경할 데이터가 하나도 없으면 에러 발생
    if (Object.keys(updatableFields).length === 0) {
      throw new BadRequestException('At least one field must be provided.');
    }

    // 기존 사용자 정보 업데이트
    Object.assign(existingUser, updatableFields);
    const updatedUser = await this.userRepository.save(existingUser);

    // 민감한 정보 제외하고 응답 생성
    const { password, refreshToken, role, ...safeUser } = updatedUser;

    return {
      message: 'User information successfully updated',
      statusCode: 200,
      data: safeUser,
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
