import { Order } from '../../domain/entity/order.entity';
import { OrderItemOption } from '../../domain/entity/order-item-option.entity';

export interface ICreateOrderProduct {
  productId: number;
  options?: OrderItemOption[];
}

export interface ICreateOrderInput {
  merchantId: number;
  items: ICreateOrderProduct[];
  address: string;
  dongCode?: string;
}

export interface ICreateOrderOutput {
  order?: Order;
}
