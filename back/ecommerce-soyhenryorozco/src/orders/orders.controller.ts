import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    const {userId, productIds} = createOrderDto
    return this.ordersService.create(userId, productIds);
  }

  /**
   * Permite obtener todas las ordenes //
   * Necesitas estar logueado y ser administrador
   */
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(id);
  // }
}
