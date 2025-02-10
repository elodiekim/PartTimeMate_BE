import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 로그인 없이 접근 가능한 경로 설정
  public whiteList = ['/posts', '/public'];

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer === 'Bearer' && token) {
        // Access Token 검증
        try {
          const payload = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET, // JWT_SECRET을 사용해 검증
          });

          // Payload를 확인하여 Access Token인지 확인
          if (payload.type === 'access') {
            // console.log('This is an Access Token');
            return super.canActivate(context); // Access Token인 경우 인증 진행
          } else if (payload.type === 'refresh') {
            // console.log('This is a Refresh Token');
            return false; // Refresh Token 처리
          }
        } catch (error) {
          console.error('JWT verification error:', error.message);
          return false; // 토큰이 유효하지 않으면 인증 실패 처리
        }
      }
    }
    // 화이트리스트에 있는 경로는 인증을 건너뛴다
    if (this.whiteList.includes(request.url)) {
      return true;
    }

    // 그 외의 경로는 JWT 인증을 수행
    return super.canActivate(context);
  }
}
