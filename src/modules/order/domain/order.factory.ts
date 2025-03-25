import { Injectable } from '@nestjs/common';
import { ICreateOrderInput } from '../application/dto/create-order.dto';
import { CreateOrderUsecase } from './usecase/create-order.usecase';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from './entity/order.entity';
import { FindOrdersUsecase } from './usecase/find-orders.usecase';
import { IFindOrdersInput } from '../application/dto/find-orders.dto';

@Injectable()
export class OrderFactory {
  constructor(
    private readonly createOrderUsecase: CreateOrderUsecase,
    private readonly findOrdersUsecase: FindOrdersUsecase,
  ) {}

  createOrder(input: ICreateOrderInput, customer: User): Promise<Order> {
    return this.createOrderUsecase.execute(input, customer);
  }

  findOrders(input: IFindOrdersInput, user: User): Promise<Order[]> {
    return this.findOrdersUsecase.execute(input, user);
  }
}
