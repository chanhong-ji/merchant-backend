import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { IProductOption } from './product-option.interface';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  photo?: string;
  description: string;
  options: IProductOption[];
  merchant: IMerchant;
  merchantId: number;
  createdAt: Date;
  updatedAt: Date;
}
