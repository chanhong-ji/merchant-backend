import {
  EventSubscriber,
  EntitySubscriberInterface,
  LoadEvent,
  DataSource,
} from 'typeorm';
import { MerchantModel } from './model/merchant.model';
import { Merchant } from '../../domain/entity/merchant.entity';

@EventSubscriber()
export class MerchantSubscriber
  implements EntitySubscriberInterface<MerchantModel>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return MerchantModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: MerchantModel, event?: LoadEvent<MerchantModel>) {
    Object.setPrototypeOf(model, Merchant.prototype); // 모델에서 엔티티로 자동 변환
  }
}
