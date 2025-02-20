import {
  BadRequestException,
  ForbiddenException,
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
import { PageRequestDto, ReadAllUsersDto } from './dto/read-all-users.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ReadUserDto } from './dto/read-user.dto';
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

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null as unknown as string, //typeorm에서의 타입 검사 문제를 우회
    });
  }

  async updateMe(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    const existingUser = await this.findOne(user.id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    // 자기 자신을 업데이트할 때는 role을 변경할 수 없도록 막기
    if (updateUserDto.role) {
      throw new ForbiddenException('You cannot change your own role');
    }

    const updatedUser = await this.updateUserFields(
      existingUser,
      updateUserDto,
    );

    // 민감한 정보 제외하고 응답 생성
    const { password, refreshToken, role, ...safeUser } = updatedUser;

    return {
      message: 'User information successfully updated',
      statusCode: 200,
      data: safeUser,
    };
  }

  // ─────────────────────────────────────────────────────────
  // ✅ 공통 업데이트 로직 (사용자 & 관리자)
  // ─────────────────────────────────────────────────────────
  private async updateUserFields(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // 업데이트 가능한 필드 목록
    const fieldsToUpdate: (keyof UpdateUserDto)[] = [
      'password',
      'preferredLanguage',
      'phoneNumber',
      'firstName',
      'lastName',
      'role',
    ];

    const updatableFields: Partial<User> = {};

    // 비밀번호는 해싱 후 저장
    if (updateUserDto.password) {
      updatableFields.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // 나머지 필드 업데이트
    fieldsToUpdate.forEach((field) => {
      if (field !== 'password' && updateUserDto[field] !== undefined) {
        updatableFields[field] = updateUserDto[field];
      }
    });

    if (Object.keys(updatableFields).length === 0) {
      throw new BadRequestException('At least one field must be provided.');
    }

    // 기존 사용자 정보 업데이트
    Object.assign(user, updatableFields);
    return await this.userRepository.save(user);
  }

  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 정보 업데이트 (관리자 전용)
  // ─────────────────────────────────────────────────────────
  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    const existingUser = await this.findOne(userId);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.updateUserFields(
      existingUser,
      updateUserDto,
    );
    // 민감한 정보 제외하고 응답 생성
    const { password, refreshToken, ...safeUser } = updatedUser;

    return {
      message: `User with ID ${existingUser.email} successfully updated`,
      statusCode: 200,
      data: safeUser,
    };
  }

  async findAll(pageRequestDto: PageRequestDto): Promise<ReadAllUsersDto> {
    const { page = 1 } = pageRequestDto;
    const limit = 20;
    const [users, totalCount] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPage = Math.ceil(totalCount / limit);
    return {
      message: 'Successfully retrieved all users.',
      statusCode: 200,
      data: {
        users,
        totalCount,
        totalPage,
        page,
        // limit,
      },
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
