import { ArrayNotEmpty, IsNotEmpty, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
  @IsNotEmpty()
  @IsUUID('4')
  itemId: string;
  
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsUUID('4')
  addressId: string;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsUUID('4')
  customerId: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true})
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[]
}