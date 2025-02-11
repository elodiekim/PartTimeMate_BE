import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './utils/setupSwagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('SERVER_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 입력값을 DTO 객체로 변환
      whitelist: true, // DTO에 정의된 속성만 허용
      forbidNonWhitelisted: true, // DTO에 없는 속성은 거부
      skipMissingProperties: false, // 필수 속성 누락시 에러 발생
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // 허용할 도메인 명시
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // 쿠키 및 인증 정보 포함 요청 허용
    allowedHeaders: ['Content-Type, Authorization'], // 특정 헤더만 허용
    optionsSuccessStatus: 200,
  });

  setupSwagger(app);

  await app.listen(PORT);
  logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
