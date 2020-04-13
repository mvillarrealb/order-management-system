import { Order } from "./order.entity";
import { ManyToOne, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class OrderDetail {
  @PrimaryColumn()
  id: string;
  
  @Column()
  itemId: string;
  
  @Column()
  quantity: number;
  
  @Column()
  addressId: string;

  @ManyToOne(type => Order, order => order.details, { eager: false })
  order: Order;
  
  @Column()
  orderId: string;
}