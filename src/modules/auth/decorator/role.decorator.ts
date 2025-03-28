import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/domain/user-role.enum';

export type AllowedRoles = keyof typeof UserRole;

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
