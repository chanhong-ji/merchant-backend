import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderItemOptionDto } from './order-item-option.dto';
import { OrderItemOption } from '../../domain/entity/order-item-option.entity';

@ObjectType()
export class SimpleOrderItemDto {
  @Field(() => Int, { description: '주문 아이디' })
  id: number;

  @Field(() => [OrderItemOptionDto], { nullable: true, description: '상품 옵션' })
  options?: OrderItemOption[];
}
