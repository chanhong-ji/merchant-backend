import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { OrderDto } from './abstract/order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { OrderItem } from '../../domain/entity/order-item.entity';
import { DetailUserDto } from 'src/modules/user/presentation/dto/detail-user.dto';
import { SimpleUserDto } from 'src/modules/user/presentation/dto/simple-user.dto';
import { SimpleMerchantDto } from 'src/modules/merchant/presentation/dto/simple-merchant.dto';
import { SimpleOrderItemDto } from './simple-order-item.dto';

@ObjectType()
export class DetailOrderDto extends PickType(OrderDto, ['id', 'status', 'total', 'createdAt'], ObjectType) {
  @Field(() => DetailUserDto, { nullable: true, description: '주문자' })
  customer?: User;

  @Field(() => SimpleUserDto, { nullable: true, description: '배달원' })
  driver?: User;

  @Field(() => SimpleMerchantDto, { nullable: true, description: '판매처' })
  merchant?: Merchant;

  @Field(() => [SimpleOrderItemDto], { description: '주문 상품' })
  items: OrderItem[];
}
