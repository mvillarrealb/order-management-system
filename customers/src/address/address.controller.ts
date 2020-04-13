import { Controller, Post, Put, Delete, Get, Param, ParseUUIDPipe, Body, ValidationPipe } from '@nestjs/common';
import { UpdateAddressDTO } from './dto/update-address.dto';
import { CreateAddressDTO } from './dto/create-address.dto';
import { Address } from '../entities/address.entity';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}
  
  @Post('customers/:id/addresses')
  createAddress(
    @Param('id', ParseUUIDPipe) customerId: string,
    @Body(ValidationPipe) createAddressDTO: CreateAddressDTO
  ): Promise<Address> {
    return this.addressService.createAddress(customerId, createAddressDTO);
  }
  
  @Get('customers/:id/addresses')
  findCustomerAddresses(@Param('id', ParseUUIDPipe) customerId: string): Promise<Address[]> {
    return this.addressService.findCustomerAddresses(customerId);
  }
  
  @Get('addresses/:id')
  findAddress(@Param('id', ParseUUIDPipe) id: string): Promise<Address> {
    return this.addressService.findAddress(id);
  }

  @Put('addresses/:id')
  updateAddress(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body(ValidationPipe) updateAddressDTO: UpdateAddressDTO
  ): Promise<Address> {
    return this.addressService.updateAddress(id, updateAddressDTO);
  }
  
  @Delete('addresses/:id')
  deleteAddress(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.addressService.deleteAddress(id);
  }

}
