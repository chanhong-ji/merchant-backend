import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { ICategory } from './category.interface';

export interface IMerchant {
  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  createdAt: Date;
  updatedAt: Date;
  owner: IUser;
  category: ICategory;
}
