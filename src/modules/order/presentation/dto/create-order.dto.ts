import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  ICreateOrderInput,
  ICreateOrderOutput,
  ICreateOrderProduct,
} from '../../application/dto/create-order.dto';
import { Order } from '../../domain/entity/order.entity';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { SimpleOrderDto } from './simple-order.dto';
import { OrderOption } from '../../domain/entity/order-item.entity';
import { OrderOptionDto } from './order-option.dto';

@ObjectType()
export class CreateOrderProduct implements ICreateOrderProduct {
  @Field(() => Int, { description: '상품 아이디' })
  productId: number;

  @Field(() => [OrderOptionDto], { nullable: true, description: '선택 옵션' })
  choices?: OrderOption[];
}

@InputType()
export class CreateOrderInput implements ICreateOrderInput {
  @Field(() => Int, { description: '판매처 아이디' })
  merchantId: number;

  @Field(() => String, { description: '주소' })
  address: string;

  @Field(() => String, { nullable: true, description: '동 코드' })
  dongCode?: string;

  @Field(() => [CreateOrderProduct], { description: '상품 목록' })
  products: CreateOrderProduct[];
}

@ObjectType()
export class CreateOrderOutput
  extends BaseOutput
  implements ICreateOrderOutput
{
  @Field(() => SimpleOrderDto, { nullable: true, description: '생성된 주문' })
  order?: Order;
}
