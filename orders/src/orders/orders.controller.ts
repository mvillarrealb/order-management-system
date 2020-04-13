import { Controller, Post, Body, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createOrder(
    @Body(new ValidationPipe()) createOrderDTO: CreateOrderDTO
  ) {
    return this.ordersService.createOrder(createOrderDTO);
  }
}
