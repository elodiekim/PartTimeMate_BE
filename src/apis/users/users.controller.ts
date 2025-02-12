import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
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

  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 정보 수정 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  // ─────────────────────────────────────────────────────────
  // ✅ 특정 사용자 삭제 API (관리자용)
  // ─────────────────────────────────────────────────────────
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
