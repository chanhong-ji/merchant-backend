import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductFactory } from './domain/product.factory';
import {
  CreateProductInput,
  CreateProductOutput,
} from './presentation/dto/create-product.dto';
import { Role } from '../auth/decorator/role.decorator';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from '../user/domain/entity/user.entity';
import { BaseOutput } from '../shared/presentation/dto/base.dto';
import {
  EditProductInput,
  EditProductOutput,
} from './presentation/dto/edit-product.dto';

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

  @Mutation(() => BaseOutput)
  @Role(['Owner'])
  async removeProduct(
    @Args('id') id: number,
    @AuthUser() user: User,
  ): Promise<BaseOutput> {
    await this.factory.removeProduct(id, user);
    return { ok: true };
  }

  @Mutation(() => EditProductOutput)
  @Role(['Owner'])
  async editProduct(
    @Args('EditProfileInput') input: EditProductInput,
    @AuthUser() user: User,
  ): Promise<EditProductOutput> {
    const product = await this.factory.editProduct(input, user);
    return { ok: true, product };
  }
}
