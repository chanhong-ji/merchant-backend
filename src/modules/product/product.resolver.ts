import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductFactory } from './domain/product.factory';
import {
  CreateProductInput,
  CreateProductOutput,
} from './presentation/dto/create-product.dto';
import { Role } from '../auth/decorator/role.decorator';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from '../user/domain/entity/user.entity';

@Resolver()
export class ProductResolver {
  constructor(private readonly factory: ProductFactory) {}

  @Mutation(() => CreateProductOutput)
  @Role(['Owner'])
  async createProduct(
    @Args('CreateProductInput') input: CreateProductInput,
    @AuthUser() user: User,
  ): Promise<CreateProductOutput> {
    const product = await this.factory.createProduct(input, user);
    return { ok: true, productId: product.id };
  }
}
