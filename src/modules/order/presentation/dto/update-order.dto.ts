import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { IUpdateOrderInput, IUpdateOrderOutput } from '../../application/dto/update-order.dto';
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { OrderDto } from './abstract/order.dto';

@InputType()
export class UpdateOrderInput extends PickType(OrderDto, ['id', 'status'], InputType) implements IUpdateOrderInput {}

@ObjectType()
export class UpdateOrderOutput extends BaseOutput implements IUpdateOrderOutput {
  @Field(() => Int, { nullable: true, description: '주문 아이디' })
  id?: number;
}
