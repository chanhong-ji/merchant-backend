import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { OrderFactory } from './domain/order.factory';
import { CreateOrderInput, CreateOrderOutput } from './presentation/dto/create-order.dto';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { Role } from '../auth/decorator/role.decorator';
import { FindOrdersInput, FindOrdersOutput } from './presentation/dto/find-orders.dto';
import { User } from '../user/domain/entity/user.entity';
import { FindOrderInput, FindOrderOutput } from './presentation/dto/find-order.dto';

@Resolver()
export class OrderResolver {
  constructor(private readonly factory: OrderFactory) {}

  @Mutation(() => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(@Args('CreateOrderInput') input: CreateOrderInput, @AuthUser() user): Promise<CreateOrderOutput> {
    const order = await this.factory.createOrder(input, user);
    return {
      ok: true,
      order,
    };
  }

  @Query(() => FindOrdersOutput)
  @Role(['Client', 'Owner', 'Delivery'])
  async findOrders(@Args('FindOrdersInput') input: FindOrdersInput, @AuthUser() user: User): Promise<FindOrdersOutput> {
    const orders = await this.factory.findOrders(input, user);
    return {
      ok: true,
      orders,
    };
  }

  @Query(() => FindOrderOutput)
  @Role(['Client', 'Owner', 'Delivery'])
  async findOrderDetail(
    @Args('FindOrderInput') input: FindOrderInput,
    @AuthUser() user: User,
  ): Promise<FindOrderOutput> {
    const order = await this.factory.findOrder(input, user);
    return {
      ok: true,
      order,
    };
  }
}
