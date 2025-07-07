import { Products } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'CATEGORIES',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Products, (product: Products) => product.category)
  products: Products[];
}
