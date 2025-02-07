import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (app: INestApplication): void => {
  const configService = app.get(ConfigService);

  // 기본값을 설정하여 undefined가 아닌 값을 보장
  const swaggerId = configService.get('SWAGGER_ID') || 'defaultUser';
  const swaggerPw = configService.get('SWAGGER_PW') || 'defaultPassword';
  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [swaggerId]: swaggerPw,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('PartTimeMate Test Server Docs')
    .setDescription('PartTimeMate Test API Server')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'jwt',
        in: 'header',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  SwaggerModule.setup('docs', app, document);
};
