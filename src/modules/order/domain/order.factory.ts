import { Injectable } from '@nestjs/common';
import { ICreateOrderInput } from '../application/dto/create-order.dto';
import { CreateOrderUsecase } from './usecase/create-order.usecase';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderFactory {
  constructor(private readonly createOrderUsecase: CreateOrderUsecase) {}

  createOrder(input: ICreateOrderInput, customer: User): Promise<Order> {
    return this.createOrderUsecase.execute(input, customer);
  }
}
