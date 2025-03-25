import {
  EventSubscriber,
  EntitySubscriberInterface,
  LoadEvent,
  DataSource,
} from 'typeorm';
import { ProductModel } from './model/product.model';
import { Product } from '../../domain/entity/product.entity';

@EventSubscriber()
export class ProductSubscriber
  implements EntitySubscriberInterface<ProductModel>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ProductModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: ProductModel, event?: LoadEvent<ProductModel>) {
    Object.setPrototypeOf(model, Product.prototype); // 모델에서 엔티티로 자동 변환
  }
}
