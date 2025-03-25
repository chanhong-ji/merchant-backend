import { IOrder } from '../../../domain/interface/order.interface';
import { OrderStatus } from '../../../domain/enum/order-status.enum';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/modules/user/presentation/dto/abstract/user.dto';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/abstract/merchant.dto';
import { OrderItem } from 'src/modules/order/domain/entity/order-item.entity';
import { OrderItemDto } from './order-item.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class OrderDto implements IOrder {
  @Field(() => Int, { description: '아이디' })
  id: number;

  @Field(() => UserDto, { description: '주문자', nullable: true })
  customer?: User;

  @Field(() => UserDto, { description: '주문자', nullable: true })
  driver?: User;

  @Field(() => MerchantDto, { description: '판매처', nullable: true })
  merchant?: Merchant;

  @Field(() => [OrderItemDto], { description: '주문 상품' })
  items: OrderItem[];

  @Field(() => OrderStatus, { description: '주문 상태' })
  status: OrderStatus;

  @Field(() => Int, { description: '총 가격' })
  total: number;

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
