import { DataSource, EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { OrderModel } from '../model/order.model';
import { Order } from 'src/modules/order/domain/entity/order.entity';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<OrderModel> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return OrderModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: OrderModel, event?: LoadEvent<OrderModel>) {
    Object.setPrototypeOf(model, Order.prototype); // 모델에서 엔티티로 자동 변환
  }
}
