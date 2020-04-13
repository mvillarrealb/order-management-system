import { Repository, EntityRepository } from "typeorm";
import { NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { Customer } from "../entities/customer.entity";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdateCustomerDTO } from "./dto/update-customer.dto";
import { FindCustomersDTO } from "./dto/find-customers.dto";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

  private logger: Logger = new Logger('CustomerRepository');

  async listCustomers(findCustomersDTO: FindCustomersDTO): Promise<Customer[]> {
    const criteria = this.createQueryBuilder();
    if(findCustomersDTO.limit != null) {
      criteria.limit(findCustomersDTO.limit);
    }
    if(findCustomersDTO.offset != null) {
      criteria.offset(findCustomersDTO.offset);
    }
    return criteria.getMany();
  }
  /**
   * 
   * @param createCustomerDTO 
   */
  async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const { name, lastName, email, identityDocument } = createCustomerDTO;
    const customer = this.create({
      id: uuid(),
      name,
      lastName,
      email,
      identityDocument,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    });
    try {
      await this.save(customer);
      return customer;
    } catch(error) {
      this.logger.error(`Failed to create customer. Data: ${JSON.stringify(createCustomerDTO)}`, error.stack);
      throw new InternalServerErrorException('Error occurred trying to create customer');
    }
  }
  /**
   * 
   * @param customerId 
   * @param updateCustomerDTO 
   */
  async updateCustomer(customerId: string, updateCustomerDTO: UpdateCustomerDTO): Promise<Customer> {
    const customer = await this.findCustomer(customerId);
    try {
      Object.assign(customer, updateCustomerDTO);
      customer.updatedAt = new Date();
      customer.save();
    } catch(error) {
      this.logger.error(`Failed to update customer ${customerId}. Data: ${JSON.stringify(updateCustomerDTO)}`, error.stack);
      throw new InternalServerErrorException('Error occurred trying to update customer');
    }
    return customer;
  }
  
  async deleteCustomer(customerId: string): Promise<void> {
    const { affected } = await this.delete({id: customerId });
    if(affected === 0) {
      throw new NotFoundException(`Customer with id ${customerId} does not exists`);
    }
  }
  
  async findCustomer(customerId: string): Promise<Customer> {
    const customer = await this.findOne(customerId);
    if(customer == null ) {
      throw new NotFoundException(`Customer with id ${customerId} does not exists`);
    }
    return customer;
  }
}