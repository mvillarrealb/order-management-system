import { IsOptional } from "class-validator";

export class FindCustomersDTO {
  @IsOptional()
  limit: number;
  @IsOptional()
  offset: number;
  @IsOptional()
  search: string;
  @IsOptional()
  identityDocument: string;
}
