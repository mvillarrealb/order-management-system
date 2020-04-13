import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, ProductsModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
