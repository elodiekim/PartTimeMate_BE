// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
//   async canActivate(context: ExecutionContext) {
//     const activate = (await super.canActivate(context)) as boolean;
//     const request = context.switchToHttp().getRequest();
//     await super.logIn(request);
//     return activate;
//   }
// }

// google-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

// google-auth.guard.ts
// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const role = request.query.role;
//     request.role = role; // 역할 정보를 요청 객체에 추가
//     return (await super.canActivate(context)) as boolean;
//   }

//   handleRequest(err, user, info, context) {
//     const req = context.switchToHttp().getRequest();
//     const role = req.role;
//     if (user) {
//       user.role = role; // 역할 정보를 사용자 객체에 추가
//     }
//     return user;
//   }
// }
