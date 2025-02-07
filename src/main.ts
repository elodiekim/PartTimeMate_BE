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

  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // 입력값을 DTO 객체로 변환
    whitelist: true,  // DTO에 정의된 속성만 허용
    forbidNonWhitelisted: true,  // DTO에 없는 속성은 거부
    skipMissingProperties: false,  // 필수 속성 누락시 에러 발생
  }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
    optionsSuccessStatus: 200,
  });

  setupSwagger(app);

  await app.listen(PORT);
  logger.log(`Server running on ${await app.getUrl()}`);

}
bootstrap();
