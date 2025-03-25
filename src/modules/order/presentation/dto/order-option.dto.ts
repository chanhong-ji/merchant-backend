import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IOrderItemOption } from '../../domain/interface/order-item-optin.interface';

@ObjectType('OrderOption')
@InputType()
export class OrderItemOptionDto implements IOrderItemOption {
  @Field(() => String, { description: '선택한 옵션 이름' })
  name: string;

  @Field(() => String, { nullable: true, description: '선택한 옵션의 선택값' })
  choice?: string;
}
