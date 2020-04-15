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
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  
  @Column()
  active: boolean;
}