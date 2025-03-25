import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  merchant: IMerchant;
  merchantId: number;
  createdAt: Date;
  updatedAt: Date;
}
