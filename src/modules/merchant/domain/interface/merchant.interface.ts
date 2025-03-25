import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { ICategory } from './category.interface';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { IOrder } from 'src/modules/order/domain/interface/order.interface';

export interface IMerchant {
  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  owner: IUser;
  products: IProduct[];
  orders: IOrder[];
  ownerId: number;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}
