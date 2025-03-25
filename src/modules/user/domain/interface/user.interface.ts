import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { UserRole } from '../user-role.enum';
import { IVerification } from './verification.interface';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  verified: boolean;
  dongCode?: string;
  merchants: IMerchant[];
  verification?: IVerification;
  createdAt: Date;
  updatedAt: Date;
}
