import {
  EventSubscriber,
  EntitySubscriberInterface,
  LoadEvent,
  DataSource,
} from 'typeorm';
import { CategoryModel } from '../model/category.model';
import { Category } from 'src/modules/merchant/domain/entity/category.entity';

@EventSubscriber()
export class CategorySubscriber
  implements EntitySubscriberInterface<CategoryModel>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return CategoryModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: CategoryModel, event?: LoadEvent<CategoryModel>) {
    Object.setPrototypeOf(model, Category.prototype); // 모델에서 엔티티로 자동 변환
  }
}
