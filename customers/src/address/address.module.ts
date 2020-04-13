import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { CustomerRepository } from '../customers/customer.repository';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository, CustomerRepository]),
    CustomersModule
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
