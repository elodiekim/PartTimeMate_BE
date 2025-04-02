import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './utils/configValidationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './utils/typeOrmModuleOptions';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { JobPostingsModule } from './apis/job-postings/job-postings.module';
import { CompanyModule } from './apis/company/company.module';
import { AdminModule } from './admin/admin.module';
import { JobCategoriesModule } from './apis/job-categories/job-categories.module';

import * as path from 'path';
import { JobBenefitsModule } from './apis/job-benefits/job-benefits.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      // envFilePath: `${__dirname}/../.env.${process.env.NODE_ENV}`,
      envFilePath: path.join(
        __dirname,
        '../.env.' + (process.env.NODE_ENV || 'local'),
      ), // 절대 경로 사용
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    AuthModule,
    JobPostingsModule,
    CompanyModule,
    AdminModule,
    JobCategoriesModule,
    JobBenefitsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
