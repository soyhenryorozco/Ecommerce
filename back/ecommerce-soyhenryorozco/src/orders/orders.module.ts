import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Order } from './entities/order.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Order, Category, OrderDetails, Products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
