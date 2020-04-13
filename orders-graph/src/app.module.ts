import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
