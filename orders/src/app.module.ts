import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    OrdersModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
