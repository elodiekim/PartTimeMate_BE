import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCategory } from './entities/job-category.entity';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { ReadAllJobCategoriesDto } from './dto/job-category-response.dto';
import { ReadAllSubCategoriesDto } from './dto/sub-category-response.dto';

@Injectable()
export class JobCategoriesService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async createCategory(createJobCategoryDto: CreateJobCategoryDto) {
    const jobCategory =
      await this.jobCategoryRepository.create(createJobCategoryDto);
    const savedCategory = await this.jobCategoryRepository.save(jobCategory);
    return {
      message: `JobCategory registration successful`,
      statusCode: 201,
      data: {
        id: savedCategory.id,
        name: savedCategory.name,
        createdAt: savedCategory.createdAt,
        updatedAt: savedCategory.updatedAt,
      },
    };
  }

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, jobCategoryId } = createSubCategoryDto;
    const jobCategory = await this.jobCategoryRepository.findOne({
      where: { id: jobCategoryId },
    });
    if (!jobCategory) {
      throw new NotFoundException(
        `JobCategory with ID ${jobCategoryId} not found.`,
      );
    }

    const newSubCategory = this.subCategoryRepository.create({
      name,
      jobCategory,
    });

    const savedCategory = await this.subCategoryRepository.save(newSubCategory);

    return {
      message: `SubCategory registration successful`,
      statusCode: 201,
      data: {
        id: savedCategory.id,
        name: savedCategory.name,
        categoryId: savedCategory.jobCategory,
        createdAt: savedCategory.createdAt,
        updatedAt: savedCategory.updatedAt,
      },
    };
  }

  async findAllCategories(): Promise<ReadAllJobCategoriesDto> {
    const categories = await this.jobCategoryRepository.find({
      order: { name: 'ASC' },
    });
    return {
      message: 'Successfully retrieved all job categories',
      statusCode: 200,
      data: { categories },
    };
  }

  async findSubCategoriesByCategoryId(
    categoryId: number,
  ): Promise<ReadAllSubCategoriesDto> {
    const subCategories = await this.subCategoryRepository
      .createQueryBuilder('subCategory')
      .innerJoinAndSelect('subCategory.jobCategory', 'jobCategory')
      .where('jobCategory.id = :categoryId', { categoryId })
      .getMany();

    if (subCategories.length === 0) {
      throw new NotFoundException(
        `No subcategories found for category ID ${categoryId}`,
      );
    }
    return {
      message: 'Successfully retrieved all job subcategories',
      statusCode: 200,
      data: { subCategories },
    };
  }
  update(id: number, updateJobCategoryDto: UpdateJobCategoryDto) {
    return `This action updates a #${id} jobCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobCategory`;
  }
}
