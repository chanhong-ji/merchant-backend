import { Order } from '../../domain/entity/order.entity';
import { OrderStatus } from '../../domain/enum/order-status.enum';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findByIds(id: number[]): Promise<Order[]>;
  findOrdersByCustomerId(
    userId: number,
    status: OrderStatus | undefined,
    limit: number,
    offset: number,
  ): Promise<Order[]>;
  findOrdersByOwnerId(userId: number, status: OrderStatus | undefined, limit: number, offset: number): Promise<Order[]>;
  findOrdersByDriverId(
    userId: number,
    status: OrderStatus | undefined,
    limit: number,
    offset: number,
  ): Promise<Order[]>;
}
