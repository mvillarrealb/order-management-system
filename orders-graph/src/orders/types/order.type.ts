import { ObjectType, Field } from "@nestjs/graphql";
import { CustomerType } from "./customer.type";
import { ItemType } from "./item.type";

@ObjectType('Order')
export class OrderType {
  @Field()
  orderId: string;
  
  @Field(type => CustomerType)
  customer: string;
  
  @Field(type => [ItemType])
  items: string[];
  
  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
}