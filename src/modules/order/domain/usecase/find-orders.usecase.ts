import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/repository/order.repository';
import { IFindOrdersInput } from '../../application/dto/find-orders.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { UserRole } from 'src/modules/user/domain/user-role.enum';

@Injectable()
export class FindOrdersUsecase {
  constructor(@Inject('OrderRepository') private readonly repository: OrderRepository) {}
  async execute(input: IFindOrdersInput, user: User) {
    const orders = await this.findOrders(user, input);
    return orders;
  }

  async findOrders(user: User, input: IFindOrdersInput) {
    if (user.role === UserRole.Client) {
      return this.repository.findOrdersByCustomerId(user.id, input.status, input.limit, input.offset);
    }

    if (user.role === UserRole.Owner) {
      return this.repository.findOrdersByOwnerId(user.id, input.status, input.limit, input.offset);
    }

    if (user.role === UserRole.Delivery) {
      return this.repository.findOrdersByDriverId(user.id, input.status, input.limit, input.offset);
    }
    return [];
  }
}
