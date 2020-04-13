import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCustomerDTO {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  identityDocument: string;
}