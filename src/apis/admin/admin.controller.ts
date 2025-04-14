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
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/apis/auth/jwt/jwt.guard';
import { AdminGuard } from 'src/apis/auth/jwt/admin.guard';
import {
  PageRequestDto,
  ReadAllUsersDto,
} from 'src/apis/users/dto/read-all-users.dto';
import { Roles } from 'src/apis/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/apis/users/entities/user.entity';
import { UpdateUserDto } from 'src/apis/users/dto/update-user.dto';
import { ReadUserDto } from 'src/apis/users/dto/read-user.dto';

@ApiTags('Admin API')
@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ─────────────────────────────────────────────────────────
  // ✅ 모든 사용자 정보 조회 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
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
    return this.adminService.findAll(pageRequestDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 정보 조회 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Retrieve a user information (Admin only)',
    description:
      'This endpoint allows admins to retrieve specific user information.',
  })
  @ApiBearerAuth()
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return this.adminService.findOne(id);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 정보 수정 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard) // JWT 인증 + 관리자 권한 확인
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
    return this.adminService.update(id, updateUserDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 삭제 API (관리자용)
  // ─────────────────────────────────────────────────────────
  /**ToDo
   * 탈퇴한 회원 포함 조회 필요?
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
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
    return this.adminService.remove(id);
  }
}
