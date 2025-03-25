import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { IOrder } from '../interface/order.interface';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderItem } from './order-item.entity';

export class Order implements IOrder {
  id: number;
  customer?: User;
  driver?: User;
  merchant?: Merchant;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
