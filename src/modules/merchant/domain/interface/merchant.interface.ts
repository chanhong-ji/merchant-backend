import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { ICategory } from './category.interface';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';

export interface IMerchant {
  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  createdAt: Date;
  updatedAt: Date;
  owner: IUser;
  ownerId: number;
  products: IProduct[];
  category: ICategory;
}
