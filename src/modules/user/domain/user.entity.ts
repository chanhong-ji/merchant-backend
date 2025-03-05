import { UserRole } from './user-role.enum';
import { IUser } from './user.interface';
import { Merchant } from 'src/modules/merchant/domain/merchant.entity';

export class User implements IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  address: string;
  dongCode?: string;
  verified: boolean;
  merchants: Merchant[];
  createdAt: Date;
  updatedAt: Date;
}
