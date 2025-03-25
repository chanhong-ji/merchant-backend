import { Module } from '@nestjs/common';
import { ProductFactory } from './domain/product.factory';
import { ProductResolver } from './product.resolver';
import { ProductSubscriber } from 'src/infrastructure/typeorm/subscriber/product.subscriber';
import { ProductErrorService } from './domain/error/product-error.service';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    ProductResolver,
    ProductFactory,
    ProductSubscriber,
    ProductErrorService,
  ],
})
export class ProductModule {}
