import { Module } from '@nestjs/common';
import { JobBenefitsService } from './job-benefits.service';
import { JobBenefitsController } from './job-benefits.controller';
import { Benefit } from './entities/benefit.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Benefit]), JwtModule],
  controllers: [JobBenefitsController],
  providers: [JobBenefitsService],
})
export class JobBenefitsModule {}
