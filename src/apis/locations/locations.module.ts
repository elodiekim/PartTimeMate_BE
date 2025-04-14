import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationCategory } from './entities/location-category.entity';
import { LocationSubCategory } from './entities/location-sub-category.entity';
import { LocationDetail } from './entities/location-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationCategory,
      LocationSubCategory,
      LocationDetail,
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
