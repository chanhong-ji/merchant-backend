import { Order } from '../../domain/entity/order.entity';
import { OrderStatus } from '../../domain/enum/order-status.enum';

export interface IFindOrdersInput {
  status?: OrderStatus;
  limit: number;
  offset: number;
}

export interface IFindOrdersOutput {
  orders?: Order[];
}
