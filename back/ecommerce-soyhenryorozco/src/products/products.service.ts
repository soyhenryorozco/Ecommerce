import { Injectable } from '@nestjs/common';
import data from '../data';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const products: Products[] = await this.productsRepository.find();
    const start = (page - 1) * limit;
    const end = start + +limit;
    return products.slice(start, end);
  }

  async create(): Promise<string> {
    const categories: Category[] = await this.categoriesRepository.find();
    const productsToInsert: Products[] = data.map((element) => {
      const category: Category | undefined = categories.find(
        (cat) => element.category === cat.name,
      );
      const newProduct = new Products();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.imgUrl = element.imgUrl;
      newProduct.stock = element.stock;
      newProduct.category = category!;
      return newProduct;
    });
    await this.productsRepository.save(productsToInsert);
    return 'Products Added';
  }

  async getProductsById(id: string) {
    return await this.productsRepository.findOne({ where: { id } });
  }

  // async deleteProducts(id: string) {
  //   return await this.productsRepository.delete(id);
  // }

  // async updateProduct(id: string, product: any) {
  //   return await this.productsRepository.update(id, product);
  // }

  // async addProduct(product: any) {
  //   return await this.productsRepository.save(product);
  // }
}
