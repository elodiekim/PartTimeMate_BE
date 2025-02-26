import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';

import * as bcrypt from 'bcryptjs';
import { UpdatedUserResponse } from './types/user-response.interface';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 사용자 생성(Auth - SIGN UP)
   * @param createAuthDto
   */

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
  /**
   * 공통 사용자 조회 (except password, refreshToken)
   */

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

  /**
   * 현재 로그인한 유저 정보 조회
   */

  async getMe(user: User): Promise<ReadUserDto> {
    const data = await this.findOne(user.id);

    return {
      message: 'User information successfully fetched',
      statusCode: 200,
      data,
    };
  }

  /**
   * 공통 사용자 조회 (include password, refreshToken)
   */
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
      if (!user) {
        throw new UnauthorizedException('Please check your email or password.');
      }
      return user;
    } catch (e) {
      throw new Error(`Failed to find user by email: ${e.message}`);
    }
  }

  /**
   * RefreshToken 저장(Auth - LOGIN)
   */
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

  /**
   * RefreshToken 삭제(Auth - Logout)
   */

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null as unknown as string, //typeorm에서의 타입 검사 문제를 우회
    });
  }

  /**
   * 현재 로그인한 유저 정보 수정
   */

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

  /**
   * 공통 업데이트 로직 (User & Admin)
   */

  async updateUserFields(
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

  /**
   * 공통 삭제 로직 (Auth & Admin)
   */
  async remove(userId: string): Promise<{
    message: string;
    statusCode: number;
  }> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // 리프레시 토큰 제거
    await this.userRepository.update(user.id, { refreshToken: null });
    await this.userRepository.softRemove(user);

    return {
      message: 'User successfully soft deleted',
      statusCode: 200,
    };
  }
}
