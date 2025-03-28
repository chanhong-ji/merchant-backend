import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { ICategory } from '../interface/category.interface';

export class Category implements ICategory {
  id: number;
  name: string;
  coverImg?: string;
  merchants: Merchant[];
  createdAt: Date;
  updatedAt: Date;
}
