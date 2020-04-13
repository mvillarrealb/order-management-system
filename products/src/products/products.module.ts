import { Module, HttpModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [ HttpModule ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
