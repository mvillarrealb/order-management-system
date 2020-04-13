import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('Item')
export class ItemType {
  
  @Field()
  skuCode: string;
  
  @Field()
  description: string;
  
  @Field()
  units: number;
  
  @Field()
  address: string;
}