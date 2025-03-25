import { Order } from '../../domain/entity/order.entity';
import { OrderOption } from '../../domain/entity/order-item.entity';

export interface ICreateOrderProduct {
  productId: number;
  choices?: OrderOption[];
}

export interface ICreateOrderInput {
  merchantId: number;
  products: ICreateOrderProduct[];
  address: string;
  dongCode?: string;
}

export interface ICreateOrderOutput {
  order?: Order;
}
