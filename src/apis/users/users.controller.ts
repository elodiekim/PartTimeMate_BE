import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetUser } from '../decorators/get-user.decorator';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { PageRequestDto, ReadAllUsersDto } from './dto/read-all-users.dto';

@ApiTags('Users API')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  /**ToDo
   * ReadUserDto 사용하여 수정
   * */
  // ─────────────────────────────────────────────────────────
  // ✅ 현재 로그인한 유저 정보 조회 API
  // ─────────────────────────────────────────────────────────
  @ApiOperation({
    summary: 'Get logged-in user info',
    description: 'Returns the information of the currently authenticated user.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched user information.',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    return this.usersService.getMe(user);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 현재 로그인한 유저 정보 수정 API
  // ─────────────────────────────────────────────────────────
  @ApiOperation({
    summary: 'Update logged-in user info',
    description:
      'Allows the currently authenticated user to update their information.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User information successfully updated.',
    type: User, // 반환 타입을 User 엔티티로 지정
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or missing JWT token.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateMe(user, updateUserDto);
  }

  /** ToDo : ADMIN */
  // ─────────────────────────────────────────────────────────
  // ✅ 모든 사용자 정보 조회 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Retrieve all users information (Admin only)',
    description:
      'This endpoint allows admins to retrieve all user information.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users.',
    type: ReadAllUsersDto,
  })
  findAll(@Query() pageRequestDto: PageRequestDto): Promise<ReadAllUsersDto> {
    return this.usersService.findAll(pageRequestDto);
  }
  // // ─────────────────────────────────────────────────────────
  // // ✅ 특정 사용자 정보 조회 API (관리자용)
  // // ─────────────────────────────────────────────────────────
  /**ToDo
   * ReadUserDto 사용하여 수정
   * */
  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Retrieve a user information (Admin only)',
    description:
      'This endpoint allows admins to retrieve specific user information.',
  })
  @ApiBearerAuth()
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 정보 수정 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Patch('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard) // JWT 인증 + 관리자 권한 확인
  @Roles('admin') // role이 'admin'인 경우만 허용
  @ApiOperation({
    summary: 'Update a user information (Admin only)',
    description:
      'This endpoint allows admins to update user information, including their role.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User information successfully updated.',
    type: User, // 응답 타입
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can update user information.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 삭제 API (관리자용)
  // ─────────────────────────────────────────────────────────
  /**ToDo
   * 탈퇴한 회원 포함 조회 필요?
   */
  @Delete('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Soft delete a user (Admin only)',
    description: 'Allows an admin to soft delete a user by their ID.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User successfully soft deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can delete users.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
