import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';
import { OrderResolver } from './order.resolver';
import { OrderFactory } from './domain/order.factory';
import { CreateOrderUsecase } from './domain/usecase/create-order.usecase';
import { FindOrdersUsecase } from './domain/usecase/find-orders.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [
    OrderResolver,
    OrderFactory,

    /** Usecases */
    CreateOrderUsecase,
    FindOrdersUsecase,
  ],
})
export class OrderModule {}
