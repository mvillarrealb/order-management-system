import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { AddressModule } from './address/address.module';
import { TypeOrmConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    CustomersModule, 
    AddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
