import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';
import { ResourceType } from './type/resource.type';
import { PermissionInput } from './type/permission-input.type';

@Injectable()
export class AuthorizationService {
  constructor(private readonly error: ErrorService) {}

  async verifyPermission(permission: PermissionInput): Promise<void> {
    if (permission.action === 'read') {
      this.isReadAuthorized(permission.resource, permission.userId, permission.userRole);
    }
    if (permission.action === 'modify') {
      this.isModifyAuthorized(permission.resource, permission.userId, permission.userRole);
    }
    if (permission.action === 'delete') {
      this.isCancelAuthorized(permission.resource, permission.userId, permission.userRole);
    }
  }

  private isReadAuthorized(resource: ResourceType, userId: number, userRole: UserRole) {
    if (resource instanceof Order) {
      if (userRole === UserRole.Client && resource.customerId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
      if (userRole === UserRole.Delivery && resource.driverId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
      if (userRole === UserRole.Owner && resource.merchant?.ownerId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }
  }

  private isModifyAuthorized(resource: ResourceType, userId: number, userRole: UserRole) {
    if (resource instanceof Order) {
      if (userRole === UserRole.Client) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
      if (userRole === UserRole.Delivery && resource.driverId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
      if (userRole === UserRole.Owner && resource.merchant?.ownerId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }
  }

  private isCancelAuthorized(resource: ResourceType, userId: number, userRole: UserRole) {
    if (resource instanceof Order) {
      if (userRole === UserRole.Client && resource.customerId !== userId) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
      if (userRole === UserRole.Delivery || userRole === UserRole.Owner) {
        throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), { level: 'warn' });
      }
    }
  }
}
