import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

/**req.user 전체를 반환. 이 경우 @GetUser()로 사용하면 user 객체 전체를 가져오게*/
// export const GetUser = createParamDecorator(
//   (_data, ctx: ExecutionContext): User => {
//     const req = ctx.switchToHttp().getRequest();

//     return req.user;
//   },
// );

/**data를 통해 특정 필드만 가져올 수 있습니다. 예를 들어 @GetUser('email')로 이메일만 가져올 수 있다*/
export const GetUser = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
