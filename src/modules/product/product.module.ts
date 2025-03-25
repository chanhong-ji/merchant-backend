import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './infrastructure/typeorm/model/product.model';
import { ProductFactory } from './domain/product.factory';
import { ProductResolver } from './product.resolver';
import { TypeormProductRepository } from './infrastructure/typeorm/typeorm-product.repository';
import { ProductSubscriber } from './infrastructure/typeorm/product.subscriber';
import { ProductErrorService } from './domain/error/product-error.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  providers: [
    ProductResolver,
    ProductFactory,
    { provide: 'ProductRepository', useClass: TypeormProductRepository },
    ProductSubscriber,
    ProductErrorService,
  ],
})
export class ProductModule {}
