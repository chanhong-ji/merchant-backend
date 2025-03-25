import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderFactory } from './domain/order.factory';
import { CreateOrderInput, CreateOrderOutput } from './presentation/dto/create-order.dto';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { Role } from '../auth/decorator/role.decorator';

@Resolver()
export class OrderResolver {
  constructor(private readonly factory: OrderFactory) {}

  @Mutation(() => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @Args('CreateOrderInput') input: CreateOrderInput,
    @AuthUser() user,
  ): Promise<CreateOrderOutput> {
    const order = await this.factory.createOrder(input, user);
    return {
      ok: true,
      order,
    };
  }
}
