import { UserRole } from '../user-role.enum';
import { IUser } from '../interface/user.interface';
import { Merchant } from 'src/modules/merchant/domain/merchant.entity';
import { Verification } from './verification.entity';

export class User implements IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  dongCode?: string;
  verified: boolean;
  merchants: Merchant[];
  verification: Verification;
  createdAt: Date;
  updatedAt: Date;

  static create(input: UserAttributes) {
    const user = new User();
    for (const key of Object.keys(input)) {
      if (input[key] != null) {
        user[key] = input[key];
      }
    }
    user.verified = false;
    return user;
  }

  update(input: Partial<UserAttributes>): User {
    for (const key of Object.keys(input)) {
      if (input[key] != null) {
        this[key] = input[key];
      }
    }
    return this;
  }
}

type UserAttributes = {
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  dongCode?: string;
  verified?: boolean;
};
