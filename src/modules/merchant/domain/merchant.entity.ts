import { IMerchant } from './merchant.interface';
import { User } from 'src/modules/user/domain/entity/user.entity';

export class Merchant implements IMerchant {
  private constructor() {}

  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;

  static create(input: MerchantAttributes) {
    const merchant = new Merchant();
    for (const key of Object.keys(input)) {
      if (input[key] != null) {
        merchant[key] = input[key];
      }
    }
    return merchant;
  }

  update(input: Partial<MerchantAttributes>): Merchant {
    for (const key of Object.keys(input)) {
      if (input[key] != null) {
        this[key] = input[key];
      }
    }
    return this;
  }
}

type MerchantAttributes = {
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
};
