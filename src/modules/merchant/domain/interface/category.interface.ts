import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';

export interface ICategory {
  id: number;
  name: string;
  coverImg?: string;
  merchants: IMerchant[];
  createdAt: Date;
  updatedAt: Date;
}
