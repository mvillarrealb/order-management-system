import { StreetType } from "./street-type.enum";
import { Customer } from "./customer.entity";
import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, Unique } from "typeorm";
//console.log(Object.keys(StreetType));
@Entity()
@Unique('uniqueAddress', ['customerId', 'streetType', 'streetName', 'buildingNumber'])
export class Address extends BaseEntity {
  @PrimaryColumn()
  id: string;
  
  @Column()
  streetType: string;
  
  @Column({ length: 200 })
  streetName: string;
  
  @Column({ length: 100 })
  streetNumber: string;
  
  @Column({ length: 100 })
  buildingNumber: string;
  
  @Column({ length: 100 })
  departmentNumber: string;
  
  @Column({ nullable: true })
  reference: string;
  
  @Column({ type:'float' })
  latitude: number;
  
  @Column({ type:'float' })
  longitude: number;
  
  @ManyToOne(type => Customer, customer => customer.addresses, { eager: false })
  customer: Customer;
  
  @Column()
  customerId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}