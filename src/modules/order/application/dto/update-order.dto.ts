import { OrderStatus } from '../../domain/enum/order-status.enum';

export interface IUpdateOrderInput {
  id: number;
  status: OrderStatus;
}

export interface IUpdateOrderOutput {
  id?: number;
}
