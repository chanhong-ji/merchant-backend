import {
  EventSubscriber,
  EntitySubscriberInterface,
  LoadEvent,
  DataSource,
} from 'typeorm';
import { UserModel } from '../model/user.model';
import { User } from '../../../modules/user/domain/entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserModel> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserModel; // 이 엔티티에 대한 변경을 감지
  }

  afterLoad(model: UserModel, event?: LoadEvent<UserModel>) {
    Object.setPrototypeOf(model, User.prototype); // 모델에서 엔티티로 자동 변환
  }
}
