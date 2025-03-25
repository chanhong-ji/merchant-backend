import { Order } from '../../domain/entity/order.entity';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
}
