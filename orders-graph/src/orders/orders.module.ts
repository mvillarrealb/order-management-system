import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
