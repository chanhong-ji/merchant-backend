import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from '../decorator/role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext.req['user'];

    if (!user) {
      throw new UnauthorizedException('권한 부족');
    }

    return roles.includes(user.role);
  }
}
