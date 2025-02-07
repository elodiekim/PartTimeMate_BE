import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './utils/configValidationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './utils/typeOrmModuleOptions';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import * as path from 'path';
@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: configValidationSchema,
    // envFilePath: `${__dirname}/../.env.${process.env.NODE_ENV}`,
    envFilePath: path.join(__dirname, '../.env.' + (process.env.NODE_ENV || 'local')),  // 절대 경로 사용

  }) ,TypeOrmModule.forRootAsync(typeOrmModuleOptions), UsersModule, AuthModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
