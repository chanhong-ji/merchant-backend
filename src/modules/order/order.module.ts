import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';
import { OrderResolver } from './order.resolver';
import { OrderFactory } from './domain/order.factory';
import { OrderSubscriber } from 'src/infrastructure/typeorm/subscriber/order.subscriber';
import { CreateOrderUsecase } from './domain/usecase/create-order.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [
    OrderResolver,
    OrderFactory,
    OrderSubscriber,

    /** Usecases */
    CreateOrderUsecase,
  ],
})
export class OrderModule {}
