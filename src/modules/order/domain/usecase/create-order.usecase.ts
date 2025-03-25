import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/repository/order.repository';
import { ICreateOrderInput } from '../../application/dto/create-order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from '../entity/order.entity';

@Injectable()
export class CreateOrderUsecase {
  constructor(@Inject('OrderRepository') repository: OrderRepository) {}

  async execute(input: ICreateOrderInput, customer: User): Promise<Order> {
    return new Order();
  }
}
