import { ObjectType, PickType } from '@nestjs/graphql';
import { OrderDto } from './abstract/order.dto';

@ObjectType()
export class SimpleOrderDto extends PickType(OrderDto, ['id', 'createdAt', 'status', 'total'], ObjectType) {}
