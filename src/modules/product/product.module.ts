import { Module } from '@nestjs/common';
import { ProductFactory } from './domain/product.factory';
import { ProductResolver } from './product.resolver';
import { ProductSubscriber } from 'src/infrastructure/typeorm/subscriber/product.subscriber';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [ProductResolver, ProductFactory, ProductSubscriber],
})
export class ProductModule {}
