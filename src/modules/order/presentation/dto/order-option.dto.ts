import { Field, ObjectType } from '@nestjs/graphql';
import { IOrderOption } from 'src/modules/order/domain/interface/order-item.interface';

@ObjectType()
export class OrderOptionDto implements IOrderOption {
  @Field(() => String, { description: '선택한 옵션 이름' })
  name: string;
}
