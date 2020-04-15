import { Repository, EntityRepository } from "typeorm";
import { Address } from "src/entities/address.entity";
import { CreateAddressDTO } from "./dto/create-address.dto";
import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { UpdateAddressDTO } from "./dto/update-address.dto";
import { v4 as uuid } from 'uuid';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  
  private logger: Logger = new Logger('AddressRepository');

  async createAddress(customerId: string, createAddressDTO: CreateAddressDTO): Promise<Address> {
    const address = this.create(createAddressDTO);
    try {
      address.id = uuid();
      address.customerId = customerId;
      address.createdAt = new Date();
      address.updatedAt = new Date();
      await this.save(address);
      return address;
    } catch(error) {
      this.logger.error(`Failed to create address for customer ${customerId}. Data: ${JSON.stringify(createAddressDTO)}`, error.stack);
      throw new InternalServerErrorException('Error occurred trying to create the address');
    }
  }
  async updateAddress(id: string, updateAddressDTO: UpdateAddressDTO): Promise<Address> {
    const address = await this.findAddress(id);
    Object.assign(address, updateAddressDTO);
    address.updatedAt = new Date();
    address.save();

    return address;
  }

  async deleteAddress(id: string): Promise<void> {
    const { affected } = await this.delete(id);
    if(affected === 0 ) {
      throw new NotFoundException(`Address with id ${id} does not exists`);
    }
  }
  
  async findAddress(id: string): Promise<Address> {
    const address = await this.findOne(id);
    if(address == null) {
      throw new NotFoundException(`Address with id ${id} does not exists`);
    }
    return address;
  }

  findCustomerAddresses(customerId: string): Promise<Address[]>{ 
    return this.find({
      customerId,
    });
  }
}