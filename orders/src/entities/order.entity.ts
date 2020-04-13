import { OrderDetail } from './order-detail.entity';
import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryColumn()
  id: string;
  
  @Column()
  customerId: string;
  
  @OneToMany(type => OrderDetail, detail => detail.order, { eager: true, cascade: true })
  details: OrderDetail[];
  
  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
  @Column()
  active: boolean;
}