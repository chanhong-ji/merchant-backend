import { Injectable } from '@nestjs/common';
import { ICreateOrderInput } from '../application/dto/create-order.dto';
import { CreateOrderUsecase } from './usecase/create-order.usecase';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from './entity/order.entity';
import { FindOrdersUsecase } from './usecase/find-orders.usecase';
import { IFindOrdersInput } from '../application/dto/find-orders.dto';
import { FindOrderUsecase } from './usecase/find-order.usecase';
import { IFindOrderInput } from '../application/dto/find-order.dto';

@Injectable()
export class OrderFactory {
  constructor(
    private readonly createOrderUsecase: CreateOrderUsecase,
    private readonly findOrdersUsecase: FindOrdersUsecase,
    private readonly findOrderUsecase: FindOrderUsecase,
  ) {}

  createOrder(input: ICreateOrderInput, customer: User): Promise<Order> {
    return this.createOrderUsecase.execute(input, customer);
  }

  findOrders(input: IFindOrdersInput, user: User): Promise<Order[]> {
    return this.findOrdersUsecase.execute(input, user);
  }

  findOrder(input: IFindOrderInput, user: User): Promise<Order> {
    return this.findOrderUsecase.execute(input, user);
  }
}
