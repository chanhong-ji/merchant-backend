import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { IProduct } from '../interface/product.interface';

export class Product implements IProduct {
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  merchant: Merchant;
  merchantId: number;
  createdAt: Date;
  updatedAt: Date;
}
