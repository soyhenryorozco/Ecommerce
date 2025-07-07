import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity({
  name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({ name: 'ORDER_DETAILS_PRODUCTS' })
  products: Products[];

  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
