import { Entity, BaseEntity, PrimaryColumn, Column  } from 'typeorm';
export class Address {

}

export class Customer {
  name: string;
  lastName: string;
  email: string;
}

export class Item {
  skuCode: string;
  description: string;
  units: number;
  address: Address;
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryColumn()
  orderId: string;
  
  @Column({ type: "jsonb" })
  @Reflect.metadata("design:type", Object)
  customer: Customer;
  
  @Column({ type: "jsonb" })
  @Reflect.metadata("design:type", Object)
  items: Item[];
  
  @Column()
  createdAt: Date;
  
  @Column()
  updatedAt: Date;
}