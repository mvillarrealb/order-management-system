import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Search } from './types/order-search.type';

@Injectable()
export class OrdersService {
  private logger: Logger = new Logger('OrdersService')
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}
  /**
   * 
   * @param orderSearch 
   */
  findOrders(orderSearch: Search): Promise<Order[]> {
    const queryBuilder = this.ordersRepository.createQueryBuilder('order');
    const { limit, offset, fromDate, toDate, orderId, customer } = orderSearch;
    if (limit !== null ) {
      queryBuilder.limit(limit);
    }
    
    if (offset !== null ) {
      queryBuilder.limit(offset);
    }

    if ( fromDate != null ) {
      if( toDate != null ) {
        queryBuilder.andWhere('order.createdAt >= :fromDate and order.createdAt <= :toDate', { fromDate, toDate });
      } else {
        queryBuilder.andWhere('order.createdAt >= :fromDate', { fromDate });
      }
    }

    if ( orderId != null ) {
      queryBuilder.andWhere('order.orderId = :orderId', { orderId });
    }

    if ( customer != null ) {
      const { name, email } = customer;
      if ( name != null ) {
        queryBuilder.andWhere(
          `((order.customer)->>'name' ILIKE :name OR (order.customer)->>'lastName' ILIKE :name)`,
          { name: `'%${name}'` }
        );
      }
    }

    this.logger.log(`Performed orders query: ${JSON.stringify(queryBuilder.getSql())}`)
    
    return queryBuilder.getMany();
  }
}
