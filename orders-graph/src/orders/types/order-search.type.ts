import { ArgsType, Field, InputType } from "@nestjs/graphql";
import {  IsDateString } from 'class-validator';

@InputType('CustomerSearch')
export class CustomerSearchType {
  @Field({  nullable: true, description: 'Order Id' })
  name?: string;

  @Field({  nullable: true, description: 'Order Id' })
  email?: string;
}

@ArgsType()
export class Search {
  
  @Field({  nullable: true, description: 'Limit of the pagination' })
  limit?: number = 10;
  
  @Field({  nullable: true, description: 'Offet of the pagination' })
  offset?: number = 0;
  
  @Field(type => CustomerSearchType)
  customer?: CustomerSearchType;
  
  @Field({  nullable: true, description: 'Order Id' })
  orderId?: string;

  @Field({  nullable: true, description: 'Start date' })
  @IsDateString()
  fromDate?: string;
  
  @Field({  nullable: true, description: 'End date' })
  @IsDateString()
  toDate?: string;
}