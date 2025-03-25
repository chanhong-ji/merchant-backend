import { Order } from '../../domain/entity/order.entity';

export interface IFindOrderInput {
  id: number;
}

export interface IFindOrderOutput {
  order?: Order;
}
