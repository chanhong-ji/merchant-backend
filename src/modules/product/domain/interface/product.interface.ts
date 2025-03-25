import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { IOption } from './item.interface';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  photo?: string;
  description: string;
  options: IOption[];
  merchant: IMerchant;
  merchantId: number;
  createdAt: Date;
  updatedAt: Date;
}
