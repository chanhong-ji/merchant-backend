import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';
import { OrderResolver } from './order.resolver';
import { OrderFactory } from './domain/order.factory';
import { OrderSubscriber } from 'src/infrastructure/typeorm/subscriber/order.subscriber';

@Module({
  imports: [RepositoryModule],
  providers: [
    OrderResolver,
    OrderFactory,
    OrderSubscriber,
    /** Usecases */
  ],
})
export class OrderModule {}
