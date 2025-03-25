import { UserRole } from '../user-role.enum';
import { IUser } from '../interface/user.interface';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { Verification } from './verification.entity';
import { Order } from 'src/modules/order/domain/entity/order.entity';

export class User implements IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  dongCode?: string;
  verified: boolean;
  orders: Order[];
  rides: Order[];
  merchants: Merchant[];
  verification?: Verification;
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

  roleIs(role: UserRole) {
    return this.role === role;
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
