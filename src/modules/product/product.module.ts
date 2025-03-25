import { Module } from '@nestjs/common';
import { ProductFactory } from './domain/product.factory';
import { ProductResolver } from './product.resolver';
import { ProductSubscriber } from 'src/infrastructure/typeorm/subscriber/product.subscriber';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';
import { CreateProductUsecase } from './domain/usecase/create-product.usecase';
import { RemoveProductUsecase } from './domain/usecase/remove-product.usecase';
import { UpdateProductUsecase } from './domain/usecase/update-product.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [
    ProductResolver,
    ProductFactory,

    /** Usecase */
    CreateProductUsecase,
    RemoveProductUsecase,
    UpdateProductUsecase,
  ],
})
export class ProductModule {}
