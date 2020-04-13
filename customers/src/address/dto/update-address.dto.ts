import { IsOptional, IsLongitude, IsLatitude, IsEnum } from "class-validator";
import { StreetType } from "src/entities/street-type.enum";

export class UpdateAddressDTO {
  @IsOptional()
  @IsEnum(StreetType, {message: `streetType mus be one of: ${Object.keys(StreetType).join(',')}`})
  streetType: string;
  
  @IsOptional()
  streetName: string;
  
  @IsOptional()
  streetNumber: string;
  
  @IsOptional()
  buildingNumber: string;
  
  @IsOptional()
  departmentNumber: string;
  
  reference: string;
  
  @IsOptional()
  @IsLatitude()
  latitude: number;
  
  @IsOptional()
  @IsLongitude()
  longitude: number;
}