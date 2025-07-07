import { Injectable } from '@nestjs/common';
import data from '../data';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async populateCategories() {
    try {
      for (const category of data) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: category.category })
          .orIgnore()
          .execute();
      }
      return 'Categories created successfully';
    } catch (error) {
      console.error('Error inserting categories:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  findOne(id: string) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  // remove(id: string) {
  //   return this.categoriesRepository.delete(id);
  // }
}
