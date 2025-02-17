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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign-up API',
    description: 'This is an API for user sign-up.',
  })
  @ApiCreatedResponse({
    description: 'Sign up successful',
    schema: {
      example: {
        message: 'User sign-up successful',
        statusCode: 201,
        data: {
          email: 'sample@sample.com',
          name: 'John Doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'If the email already exists.',
    schema: {
      example: {
        message: 'User with this email already exists.',
        statusCode: 400,
        data: null,
      },
    },
  })
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log-in API',
    description:
      'This API is used for user login to obtain an access token and refresh token.',
  })
  @ApiBody({
    description: 'Login credentials (email and password)',
    type: LoginAuthDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'your-access-token',
        refreshToken: 'your-refresh-token',
        message: 'Login successful',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Please check your email or password',
    schema: {
      example: {
        message: 'Please check your email or password',
        statusCode: 401,
      },
    },
  })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh Token API',
    description:
      'This API is used to refresh the access token using the refresh token.',
  })
  @ApiBody({
    description: 'Refresh token to get a new access token',
    type: RefreshTokenDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    schema: {
      example: {
        accessToken: 'new-access-token',
        message: 'Access token refreshed',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
    schema: {
      example: {
        message: 'Invalid refresh token',
        statusCode: 401,
      },
    },
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Log-out API',
    description: '현재 로그인한 사용자를 로그아웃합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully',
    schema: {
      example: { message: 'User logged out successfully', statusCode: 200 },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async logout(
    @GetUser() user: User,
  ): Promise<{ message: string; statusCode: number }> {
    return this.authService.logout(user);
  }
}
