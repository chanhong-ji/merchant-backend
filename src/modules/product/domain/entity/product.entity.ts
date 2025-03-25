import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { IProduct } from '../interface/product.interface';
import { Option } from './option.entity';

export class Product implements IProduct {
  id: number;
  name: string;
  price: number;
  photo?: string;
  description: string;
  options: Option[];
  merchant: Merchant;
  merchantId: number;
  createdAt: Date;
  updatedAt: Date;

  static create(input: ProductAttributes) {
    const product = new Product();
    for (const key of Object.keys(input)) {
      if (input[key] != null) {
        product[key] = input[key];
      }
    }
    return product;
  }
}

type ProductAttributes = {
  name: string;
  price: number;
  photo?: string;
  description: string;
  options: Option[];
};
