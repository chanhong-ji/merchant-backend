import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/repository/order.repository';
import { ErrorService } from 'src/common/error/error.service';
import { IUpdateOrderInput } from '../../application/dto/update-order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Order } from '../entity/order.entity';
import { AuthorizationService } from 'src/modules/authorization/domain/authorization.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class UpdateOrderUsecase {
  constructor(
    @Inject('OrderRepository') private readonly repository: OrderRepository,
    private readonly authorization: AuthorizationService,
    private readonly errorService: ErrorService,
  ) {}
  async execute(input: IUpdateOrderInput, user: User): Promise<Order> {
    const order = await this.repository.findById(input.id);
    if (order == null) {
      throw new CustomGraphQLError(this.errorService.get('ORDER_NOT_FOUND'), { level: 'log' });
    }

    await this.authorization.verifyPermission({
      resource: order,
      userId: user.id,
      userRole: user.role,
      action: 'modify',
    });

    const updatedOrder = await this.repository.save(order.updateStatus(input.status));
    return updatedOrder;
  }
}
