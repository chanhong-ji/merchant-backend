import { DataSource, EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { OrderItemModel } from '../model/order-item.model';
import { OrderItem } from 'src/modules/order/domain/entity/order-item.entity';

@EventSubscriber()
export class OrderItemSubscriber implements EntitySubscriberInterface<OrderItemModel> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return OrderItemModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: OrderItemModel, event?: LoadEvent<OrderItemModel>) {
    Object.setPrototypeOf(model, OrderItem.prototype); // 모델에서 엔티티로 자동 변환
  }
}
