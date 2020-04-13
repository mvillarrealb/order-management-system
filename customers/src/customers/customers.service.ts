import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomersDTO } from './dto/find-customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customersRepository: CustomerRepository,
  ) {}
  listCustomers(findCustomersDTO: FindCustomersDTO): Promise<Customer[]> {
    return this.customersRepository.listCustomers(findCustomersDTO);
  }
  createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customersRepository.createCustomer(createCustomerDTO);
  }
  updateCustomer(customerId: string, updateCustomerDTO: UpdateCustomerDTO): Promise<Customer> {
    return this.customersRepository.updateCustomer(customerId, updateCustomerDTO);
  }
  deleteCustomer(customerId: string): Promise<void> {
    return this.customersRepository.deleteCustomer(customerId);
  }
  findCustomer(customerId: string): Promise<Customer> {
    return this.customersRepository.findCustomer(customerId);
  }
}
