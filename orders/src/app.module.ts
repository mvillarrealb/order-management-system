import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
