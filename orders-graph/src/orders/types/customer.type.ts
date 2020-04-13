import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('Customer')
export class CustomerType {
  @Field()
  name: string;
  
  @Field()
  lastName: string;

  @Field()
  email: string;
}