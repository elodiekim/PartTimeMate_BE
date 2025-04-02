import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (app: INestApplication): void => {
  const configService = app.get(ConfigService);

  const swaggerId = configService.get<string>('SWAGGER_ID');
  const swaggerPw = configService.get<string>('SWAGGER_PW');
  if (!swaggerId || !swaggerPw) {
    throw new Error(
      'SWAGGER_ID and SWAGGER_PW must be set in environment variables',
    );
  }

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
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'bearer',
    //     name: 'jwt',
    //     in: 'header',
    //   },
    //   'accessToken',
    // )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // 추가
        in: 'header',
      },
      // 'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
