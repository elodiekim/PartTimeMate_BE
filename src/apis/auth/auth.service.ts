import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { USER_ROLE } from 'src/utils/enums';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * SIGN UP
   * @param createAuthDto
   */
  async signUp(createAuthDto: CreateAuthDto): Promise<{
    message: string;
    statusCode: number;
    data: {
      email: string;
      name: string;
      phoneNumber?: string;
    } | null;
  }> {
    try {
      const existingUser = await this.usersService.findByEmail(
        createAuthDto.email,
      );
      if (existingUser) {
        return {
          message: 'User with this email already exists.',
          statusCode: 400,
          data: null,
        };
      }

      const { password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      createAuthDto.password = hashPassword;

      const newUser = await this.usersService.create(createAuthDto);

      return {
        message: 'User created successfully.',
        statusCode: 201,
        data: {
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
          phoneNumber: newUser.phoneNumber,
        },
      };
    } catch (e) {
      return {
        message: `Error occurred during sign up: ${e.message}`,
        statusCode: 500,
        data: null,
      };
    }
  }

  /**
   * LOGIN
   * @param loginAuthDto
   */
  async login(loginAuthDto: LoginAuthDto): Promise<{
    accessToken: string;
    refreshToken: string;
    message: string;
    statusCode: number;
  }> {
    try {
      const { email, password, role } = loginAuthDto;

      // 이메일로 사용자 찾기
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Please check your email or password.');
      }

      // 비밀번호 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Please check your email or password.');
      }
      // role 체크 (단, ADMIN이면 검사 생략)
      if (user.role !== USER_ROLE.ADMIN && user.role !== role) {
        throw new UnauthorizedException(
          'Invalid role. Please check your role.',
        );
      }
      // AccessToken 발급
      const accessToken = this.generateAccessToken(user);
      // RefreshToken 발급
      const refreshToken = this.generateRefreshToken(user);
      // DB에 Refresh Token 저장
      const saveRefreshToken = await this.usersService.saveToken(
        user.id,
        refreshToken,
      );

      return {
        message: 'Login successful',
        statusCode: 200,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw e; // 이미 정의된 UnauthorizedException을 그대로 던지기
      }
      throw new UnauthorizedException('An error occurred during login.');
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    message: string;
    statusCode: number;
  }> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // DB에서 유저 조회
      const user = await this.usersService.findByEmail(decoded.email);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // 새로운 Access Token 발급
      const accessToken = this.generateAccessToken(user);
      return {
        message: 'Access token refreshed',
        statusCode: 200,
        accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  /** 테스트용 15m ->12h 변경 */
  // Access Token 생성 함수
  private generateAccessToken(user: any): string {
    return this.jwtService.sign(
      { id: user.id, email: user.email, type: 'access' },
      { secret: process.env.JWT_SECRET, expiresIn: '12h' },
    );
  }

  // Refresh Token 생성 함수
  private generateRefreshToken(user: any): string {
    return this.jwtService.sign(
      { id: user.id, email: user.email, type: 'refresh' },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async logout(user): Promise<{ message: string; statusCode: number }> {
    try {
      await this.usersService.clearRefreshToken(user.id); // 해당 유저의 refreshToken을 제거
      return {
        message: 'User logged out successfully',
        statusCode: 200,
      };
    } catch (e) {
      throw new InternalServerErrorException('Failed to logout user');
    }
  }
}
