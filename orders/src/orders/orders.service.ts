import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}
  /**
   * 
   * @param createOrderDTO 
   */
  createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.ordersRepository.createOrder(createOrderDTO);
  }
}
