import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; // Verify the file path or create the file if it doesn't exist

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({
    type: 'bigint',
    nullable: true,
  })
  edad: number;
}
