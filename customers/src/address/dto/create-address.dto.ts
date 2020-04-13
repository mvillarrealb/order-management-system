import { IsNotEmpty, IsLongitude, IsLatitude, IsEnum } from "class-validator";
import { StreetType } from "src/entities/street-type.enum";

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsEnum(StreetType, {message: `streetType mus be one of: ${Object.keys(StreetType).join(',')}`})
  streetType: string;
  
  @IsNotEmpty()
  streetName: string;
  
  @IsNotEmpty()
  streetNumber: string;
  
  @IsNotEmpty()
  buildingNumber: string;
  
  @IsNotEmpty()
  departmentNumber: string;
  
  reference: string;
  
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;
  
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}