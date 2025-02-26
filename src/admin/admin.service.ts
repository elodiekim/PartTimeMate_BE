import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PageRequestDto,
  ReadAllUsersDto,
} from 'src/apis/users/dto/read-all-users.dto';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/apis/users/dto/update-user.dto';
import { UpdatedUserResponse } from 'src/apis/users/types/user-response.interface';
import { UsersService } from 'src/apis/users/users.service';
import { ReadUserDto } from 'src/apis/users/dto/read-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) {}

  /**
   * 모든 사용자 정보 조회 (Admin)
   * @param pageRequestDto
   */

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

  /**
   * 특정 사용자 정보 조회 (Admin)
   */

  async findOne(userId: string): Promise<ReadUserDto> {
    const findUser = await this.userService.findOne(userId);
    return {
      message: 'User information successfully fetched',
      statusCode: 200,
      data: findUser,
    };
  }

  /**
   * 특정 사용자 정보 수정(Admin)
   */

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    const existingUser = await this.userService.findOne(userId);

    const updatedUser = await this.userService.updateUserFields(
      existingUser,
      updateUserDto,
    );
    // 민감한 정보 제외하고 응답 생성
    const { password, refreshToken, ...safeUser } = updatedUser;

    return {
      message: `User with ${existingUser.email} successfully updated`,
      statusCode: 200,
      data: safeUser,
    };
  }

  /**
   * 특정 사용자 삭제(Admin)
   */

  async remove(userId: string): Promise<{
    message: string;
    statusCode: number;
  }> {
    await this.userService.remove(userId);
    return {
      message: 'User successfully soft deleted',
      statusCode: 200,
    };
  }
}
