import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IFindOrderInput, IFindOrderOutput } from '../../application/dto/find-order.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { Order } from '../../domain/entity/order.entity';
import { DetailOrderDto } from './detail-order.dto';

@InputType()
export class FindOrderInput implements IFindOrderInput {
  @Field(() => Int, { description: '주문 아이디' })
  id: number;
}

@ObjectType()
export class FindOrderOutput extends BaseOutput implements IFindOrderOutput {
  @Field(() => DetailOrderDto, { description: '주문 상세 정보', nullable: true })
  order?: Order;
}
