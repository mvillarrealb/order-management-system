import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAddressDTO } from './dto/update-address.dto';
import { CreateAddressDTO } from './dto/create-address.dto';
import { Address } from '../entities/address.entity';
import { AddressRepository } from './address.repository';
import { CustomerRepository } from '../customers/customer.repository';


@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}
  async createAddress(customerId: string, createAddressDTO: CreateAddressDTO): Promise<Address> {
    /** 
     * Get nice 404 exception when customer does not exists
    */
    await this.customerRepository.findCustomer(customerId);
    return this.addressRepository.createAddress(customerId, createAddressDTO);
  }
  updateAddress(id: string, updateAddressDTO: UpdateAddressDTO): Promise<Address> {
    return this.addressRepository.updateAddress(id, updateAddressDTO);
  }
  deleteAddress(id: string): Promise<void> {
    return this.addressRepository.deleteAddress(id);
  }
  findAddress(id: string): Promise<Address> {
    return this.addressRepository.findAddress(id);
  }
  findCustomerAddresses(customerId: string): Promise<Address[]> {
    return this.addressRepository.findCustomerAddresses(customerId);
  }
}
