import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from 'src/products/entities/product.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(userId: string, productIds: string[]) {
    const user: Users | null = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;
    const newOrder: Order = await this.ordersRepository.save(order);

    let total = 0;
    const productsArray: Products[] = await Promise.all(
      productIds.map(async (productId) => {
        const product: Products | null = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        total += Number(product.price);
        if (product.stock <= 0) {
          throw new BadRequestException(`Product ${product.name} has no stock`);
        }
        await this.productsRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.order = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.ordersRepository.find({
      where: { id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async findAll() {
    return await this.ordersRepository.find({
      relations: {
        orderDetails: true,
      },
    });
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return await this.ordersRepository.update(id, { ...updateOrderDto });
  // }

  // async remove(id: string) {
  //   return await this.ordersRepository.delete(id);
  // }
}
