import { IMerchant } from 'src/modules/merchant/domain/interface/merchant.interface';
import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { OrderStatus } from '../enum/order-status.enum';
import { IOrderItem } from './order-item.interface';

export interface IOrder {
  id: number;
  customer?: IUser;
  customerId?: number;
  driver?: IUser;
  driverId?: number;
  merchant?: IMerchant;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
