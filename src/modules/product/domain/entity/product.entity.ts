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
}
