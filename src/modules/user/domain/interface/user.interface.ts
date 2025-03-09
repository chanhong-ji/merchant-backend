import { IMerchant } from 'src/modules/merchant/domain/merchant.interface';
import { UserRole } from '../user-role.enum';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  verified: boolean;
  dongCode?: string;
  merchants: IMerchant[];
  createdAt: Date;
  updatedAt: Date;
}
