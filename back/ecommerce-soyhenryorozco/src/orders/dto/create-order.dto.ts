import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsArray()
  productIds: string[];
}
