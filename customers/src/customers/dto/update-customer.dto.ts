import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCustomerDTO {
  @IsOptional()
  name: string;
  @IsOptional()
  lastName: string;
  @IsOptional()
  identityDocument: string;
}