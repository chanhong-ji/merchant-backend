import { IUser } from 'src/modules/user/domain/user.interface';

export interface IMerchant {
  id: number;
  name: string;
  address: string;
  coverImage?: string;
  dongCode?: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
