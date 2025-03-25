import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../application/repository/order.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { IFindOrderInput } from '../../application/dto/find-order.dto';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';
import { ErrorService } from 'src/common/error/error.service';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { Order } from '../entity/order.entity';
import { AuthorizationService } from 'src/modules/authorization/domain/authorization.service';

@Injectable()
export class FindOrderUsecase {
  constructor(
    @Inject('OrderRepository') private readonly repository: OrderRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly errorService: ErrorService,
  ) {}
  async execute(input: IFindOrderInput, user: User): Promise<Order> {
    const order = await this.repository.findById(input.id);

    if (!order) {
      throw new CustomGraphQLError(this.errorService.get('ORDER_NOT_FOUND'), { level: 'log' });
    }

    await this.authorizationService.verifyPermission({
      resource: order,
      userId: user.id,
      action: 'read',
      userRole: user.role,
    });

    if (user.roleIs(UserRole.Client)) {
      if (order.customerId !== user.id) {
        throw new CustomGraphQLError(this.errorService.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }

    if (user.roleIs(UserRole.Owner)) {
      if (order.merchant?.ownerId !== user.id) {
        throw new CustomGraphQLError(this.errorService.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }

    if (user.roleIs(UserRole.Delivery)) {
      if (order.driverId !== user.id) {
        throw new CustomGraphQLError(this.errorService.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }

    return order;
  }
}
