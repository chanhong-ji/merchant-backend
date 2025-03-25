import { IMerchant } from '../interface/merchant.interface';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Category } from './category.entity';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Order } from 'src/modules/order/domain/entity/order.entity';

export class Merchant implements IMerchant {
  private constructor() {}

  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  category: Category;
  owner: User;
  ownerId: number;
  products: Product[];
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;

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
