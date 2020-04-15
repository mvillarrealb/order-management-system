import { BaseEntity, Entity, OneToMany, PrimaryColumn, Column, Unique } from "typeorm";
import { Address } from "./address.entity";

@Entity()
@Unique('uniqueEmail', ['email'])
export class Customer extends BaseEntity {
  @PrimaryColumn()
  id: string;
  
  @Column({ length: 200 })
  name: string;
  
  @Column({ length: 200 })
  lastName: string;
  
  @Column({ length: 100 })
  email: string;
  
  @Column({ length: 120 })
  identityDocument: string;
  
  @Column({ nullable: true })
  passwod: string;
  
  @Column({ nullable: true })
  salt: string;

  @OneToMany(type => Address, address => address.customer, { eager: true })
  addresses: Address[];
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  
  @Column()
  active: boolean;
}