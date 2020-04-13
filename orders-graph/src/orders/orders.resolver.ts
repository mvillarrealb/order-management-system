import { Resolver, Query, Args } from '@nestjs/graphql';
import { OrderType } from './types/order.type';
import { OrdersService } from './orders.service';
import { Search } from './types/order-search.type';

@Resolver(of => OrderType)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}
  @Query(returns => [OrderType])
  orders(@Args() orderSearch: Search,) {
    return this.ordersService.findOrders(orderSearch);
  }
}
