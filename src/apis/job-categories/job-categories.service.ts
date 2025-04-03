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
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

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
      jobCategoryId,
    });

    const savedCategory = await this.subCategoryRepository.save(newSubCategory);

    return {
      message: `SubCategory registration successful`,
      statusCode: 201,
      data: {
        id: savedCategory.id,
        name: savedCategory.name,
        jobCategoryId: savedCategory.jobCategoryId,
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

  // async findOneCategory(id: number) {
  //   const category = await this.jobCategoryRepository.

  // }
  async update(id: number, updateJobCategoryDto: UpdateJobCategoryDto) {
    const category = await this.jobCategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`JobCategory with ID ${id} not found.`);
    }

    category.name = updateJobCategoryDto.name ?? category.name;
    await this.jobCategoryRepository.save(category);

    return {
      message: `JobCategory update successful`,
      statusCode: 200,
      data: {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    };
  }
  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found.`);
    }

    if (updateSubCategoryDto.name) {
      subCategory.name = updateSubCategoryDto.name;
    }

    await this.subCategoryRepository.save(subCategory);

    return {
      message: `SubCategory update successful`,
      statusCode: 200,
      data: {
        id: subCategory.id,
        name: subCategory.name,
        jobCategoryId: subCategory.jobCategoryId,
        createdAt: subCategory.createdAt,
        updatedAt: subCategory.updatedAt,
      },
    };
  }
  async remove(id: number): Promise<{
    message: string;
    statusCode: number;
  }> {
    const category = await this.jobCategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`JobCategory with ID ${id} not found.`);
    }

    // 해당 카테고리에 속한 모든 서브 카테고리 찾기
    const subCategories = await this.subCategoryRepository.find({
      where: { jobCategoryId: id },
    });
    // 서브 카테고리들을 삭제
    if (subCategories.length > 0) {
      await this.subCategoryRepository.softRemove(subCategories);
    }

    await this.jobCategoryRepository.softRemove(category);

    return {
      message: 'JobCategory successfully soft deleted',
      statusCode: 200,
    };
  }

  async removeSubCategory(id: number): Promise<{
    message: string;
    statusCode: number;
  }> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found.`);
    }
    await this.jobCategoryRepository.softRemove(subCategory);
    return {
      message: 'SubCategory successfully soft deleted',
      statusCode: 200,
    };
  }
}
