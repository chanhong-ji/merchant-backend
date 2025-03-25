import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  ICreateOrderInput,
  ICreateOrderOutput,
  ICreateOrderProduct,
} from '../../application/dto/create-order.dto';
import { Order } from '../../domain/entity/order.entity';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { SimpleOrderDto } from './simple-order.dto';
import { OrderItemOption } from '../../domain/entity/order-item-option.entity';
import { OrderItemOptionDto } from './order-option.dto';

@InputType()
export class CreateOrderItem implements ICreateOrderProduct {
  @Field(() => Int, { description: '상품 아이디' })
  productId: number;

  @Field(() => [OrderItemOptionDto], {
    nullable: true,
    description: '선택 옵션',
  })
  options?: OrderItemOption[];
}

@InputType()
export class CreateOrderInput implements ICreateOrderInput {
  @Field(() => Int, { description: '판매처 아이디' })
  merchantId: number;

  @Field(() => String, { description: '주소' })
  address: string;

  @Field(() => String, { nullable: true, description: '동 코드' })
  dongCode?: string;

  @Field(() => [CreateOrderItem], { description: '상품 목록' })
  items: CreateOrderItem[];
}

@ObjectType()
export class CreateOrderOutput
  extends BaseOutput
  implements ICreateOrderOutput
{
  @Field(() => SimpleOrderDto, { nullable: true, description: '생성된 주문' })
  order?: Order;
}
