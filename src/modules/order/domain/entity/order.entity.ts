import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { IOrder } from '../interface/order.interface';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { OrderStatus } from '../enum/order-status.enum';

export class Order implements IOrder {
  customer?: User;
  driver?: User;
  merchant?: Merchant;
  products: Product[];
  total: number;
  status: OrderStatus;
}
