import { UserRole } from 'src/modules/user/domain/user-role.enum';
import { ActionType } from './action.type';
import { ResourceType } from './resource.type';

export type PermissionInput = {
  resource: ResourceType;
  userId: number;
  userRole: UserRole;
  action: ActionType;
};
