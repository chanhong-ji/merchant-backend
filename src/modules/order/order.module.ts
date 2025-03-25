import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';
import { OrderResolver } from './order.resolver';
import { OrderFactory } from './domain/order.factory';
import { CreateOrderUsecase } from './domain/usecase/create-order.usecase';
import { FindOrdersUsecase } from './domain/usecase/find-orders.usecase';
import { FindOrderUsecase } from './domain/usecase/find-order.usecase';
import { AuthorizationModule } from '../authorization/authorization.module';
import { UpdateOrderUsecase } from './domain/usecase/update-order.usecase';

@Module({
  imports: [RepositoryModule, AuthorizationModule],
  providers: [
    OrderResolver,
    OrderFactory,

    /** Usecases */
    CreateOrderUsecase,
    FindOrdersUsecase,
    FindOrderUsecase,
    UpdateOrderUsecase,
  ],
})
export class OrderModule {}
