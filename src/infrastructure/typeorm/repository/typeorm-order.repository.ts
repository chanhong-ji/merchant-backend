import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/modules/order/application/repository/order.repository';
import { OrderModel } from '../model/order.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { In, Repository } from 'typeorm';
import { OrderStatus } from 'src/modules/order/domain/enum/order-status.enum';

@Injectable()
export class TypeormOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly repository: Repository<Order>,
  ) {}

  findById(ids: number[]): Promise<Order[]> {
    return this.repository.find({
      where: { id: In(ids) },
    });
  }

  save(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  findOrdersByCustomerId(
    userId: number,
    status: OrderStatus | undefined,
    limit: number,
    offset: number,
  ): Promise<Order[]> {
    return this.repository.find({
      where: {
        customerId: userId,
        ...(status && { status }),
      },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOrdersByDriverId(
    userId: number,
    status: OrderStatus | undefined,
    limit: number,
    offset: number,
  ): Promise<Order[]> {
    return this.repository.find({
      where: {
        driverId: userId,
        ...(status && { status }),
      },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOrdersByOwnerId(
    userId: number,
    status: OrderStatus | undefined,
    limit: number,
    offset: number,
  ): Promise<Order[]> {
    return this.repository.find({
      where: {
        merchant: {
          owner: { id: userId },
        },
        ...(status && { status }),
      },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
