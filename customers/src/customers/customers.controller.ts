import { Controller, Get, Post, Put, Delete, Query, ValidationPipe, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomersDTO } from './dto/find-customers.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}
  
  @Get()
  listCustomers(@Query(ValidationPipe) findCustomersDTO: FindCustomersDTO): Promise<Customer[]> {
    return this.customersService.listCustomers(findCustomersDTO);
  }
  
  @Post()
  createCustomer(@Body(ValidationPipe) createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDTO);
  }
  
  @Put(':id')
  updateCustomer(
    @Param('id', ParseUUIDPipe) customerId: string, 
    @Body(ValidationPipe) updateCustomerDTO: UpdateCustomerDTO
  ): Promise<Customer> {
    return this.customersService.updateCustomer(customerId, updateCustomerDTO);
  }
  
  @Delete(':id')
  deleteCustomer(@Param('id', ParseUUIDPipe)  customerId: string): Promise<void> {
    return this.customersService.deleteCustomer(customerId);
  }
  
  @Get(':id')
  findCustomer(@Param('id', ParseUUIDPipe) customerId: string): Promise<Customer> {
    return this.customersService.findCustomer(customerId);
  }
}
