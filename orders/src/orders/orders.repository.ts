import { v4 as uuid } from 'uuid';
import { Repository, EntityRepository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { CreateOrderDTO, OrderItemDTO } from './dto/create-order.dto';
import { OrderDetail } from 'src/entities/order-detail.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const { customerId, items } = createOrderDTO;
    const details = items.map(this.createItem);
    const order = this.create({
      id: uuid(),
      customerId,
      details,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    });
    await this.save(order);

    return order;
  }
  createItem(detailDTO: OrderItemDTO): OrderDetail {
    const orderDetail = new OrderDetail();
    orderDetail.id = uuid();
    orderDetail.itemId = detailDTO.itemId;
    orderDetail.quantity = detailDTO.quantity;
    orderDetail.addressId = detailDTO.addressId;
    return orderDetail;
  }
}