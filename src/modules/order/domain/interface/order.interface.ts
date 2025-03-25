import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { OrderStatus } from '../enum/order-status.enum';

export interface IOrder {
  customer?: IUser;
  driver?: IUser;
  merchant?: IMerchant;
  products: IProduct[];
  total: number;
  status: OrderStatus;
}
