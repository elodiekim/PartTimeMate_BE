import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationCategory } from './entities/location-category.entity';
import { Repository } from 'typeorm';
import { LocationDetail } from './entities/location-detail.entity';
import { LocationSubCategory } from './entities/location-sub-category.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationCategory)
    private readonly locationCategoryRepository: Repository<LocationCategory>,
    @InjectRepository(LocationSubCategory)
    private readonly locationSubCategoryRepository: Repository<LocationSubCategory>,
    @InjectRepository(LocationDetail)
    private readonly locationDetailRepository: Repository<LocationDetail>,
  ) {}
  async getLocationCategories() {
    const locationCategories = await this.locationCategoryRepository.find({
      order: { name: 'ASC' },
    });
    if (!locationCategories) {
      throw new NotFoundException('Location categories not found');
    }

    return {
      statusCode: 200,
      message: 'Location categories fetched successfully',
      data: {
        locationCategories,
      },
    };
  }
  async getLocationSubCategories(id: number) {
    const locationSubCategories = await this.locationSubCategoryRepository.find(
      {
        where: { parent: { id } },
        order: { name: 'ASC' },
      },
    );
    if (!locationSubCategories) {
      throw new NotFoundException('Location sub categories not found');
    }
    return {
      statusCode: 200,
      message: 'Location sub categories fetched successfully',
      data: locationSubCategories,
    };
  }
  async getLocationDetail(id: number) {
    const locationSubCategories = await this.locationDetailRepository.find({
      where: { parent: { id } },
      order: { name: 'ASC' },
    });
    if (!locationSubCategories) {
      throw new NotFoundException('Location detail categories not found');
    }
    return {
      statusCode: 200,
      message: 'Location detail categories fetched successfully',
      data: locationSubCategories,
    };
  }
}
