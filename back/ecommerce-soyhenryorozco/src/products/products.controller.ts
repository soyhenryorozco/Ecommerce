import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  create() {
    return this.productsService.create();
  }

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productsService.getProductsById(id);
  }

  // @Post()
  // addProduct(@Body() product: any) {
  //   return this.productsService.addProduct(product);
  // }

  // @Put(':id')
  // updateProduct(@Param('id') id: string, @Body() data: any) {
  //   return this.productsService.updateProduct(id, data);
  // }

  // @Delete(':id')
  // deteleProducts(@Param('id') id: string) {
  //   return this.productsService.deleteProducts(id);
  // }
}
