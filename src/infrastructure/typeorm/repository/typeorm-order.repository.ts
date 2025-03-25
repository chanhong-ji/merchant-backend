import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/modules/order/application/repository/order.repository';
import { OrderModel } from '../model/order.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { In, Repository } from 'typeorm';

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
}
