import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IFindOrdersInput, IFindOrdersOutput } from '../../application/dto/find-orders.dto';
import { Order } from '../../domain/entity/order.entity';
import { OrderStatus } from '../../domain/enum/order-status.enum';
import { SimpleOrderDto } from './simple-order.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class FindOrdersInput implements IFindOrdersInput {
  @Field(() => OrderStatus, { nullable: true, description: '주문 상태' })
  status?: OrderStatus;

  @Field(() => Int, { description: '가져올 주문 개수' })
  limit: number;

  @Field(() => Int, { description: '건너뛸 주문 개수' })
  offset: number;
}

@ObjectType()
export class FindOrdersOutput extends BaseOutput implements IFindOrdersOutput {
  @Field(() => [SimpleOrderDto], { nullable: true, description: '주문 목록' })
  orders?: Order[];
}
