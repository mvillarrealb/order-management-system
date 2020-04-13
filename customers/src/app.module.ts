import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { CustomersModule } from './customers/customers.module';
import { AddressModule } from './address/address.module';
import { TypeOrmConfig } from './config';
import {HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    CustomersModule, 
    AddressModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
