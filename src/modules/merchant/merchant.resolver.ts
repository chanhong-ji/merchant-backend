import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MerchantFactory } from '../merchant/domain/merchant.factory';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from '../user/domain/entity/user.entity';
import { Role } from '../auth/decorator/role.decorator';
import { FindAllCategoriesOutput } from './presentation/dto/find-all-categories.dto';
import {
  CreateMerchantInput,
  CreateMerchantOutput,
} from './presentation/dto/create-merchant.dto';
import {
  UpdateMerchantInput,
  UpdateMerchantOutput,
} from './presentation/dto/update-merchant.dto';
import {
  FindMerchantByCategoryInput,
  FindMerchantByCategoryOutput,
} from './presentation/dto/find-merchant-by-category.dto';
import {
  SearchMerchantInput,
  SearchMerchantOutput,
} from './presentation/dto/search-merchant.dto';
import {
  FindMerchantByIdInput,
  FindMerchantByIdOutput,
} from './presentation/dto/find-merchant-by-id.dto';

@Resolver()
export class MerchantResolver {
  constructor(private readonly factory: MerchantFactory) {}

  @Query(() => FindMerchantByIdOutput)
  async findMerchantById(
    @Args('FindMerchantByIdInput') input: FindMerchantByIdInput,
  ) {
    const merchant = await this.factory.findMerchantById(input);
    return {
      ok: true,
      merchant,
    };
  }

  @Mutation(() => CreateMerchantOutput)
  @Role(['Owner'])
  async createMerchant(
    @Args('CreateMerchantInput') input: CreateMerchantInput,
    @AuthUser() user: User,
  ): Promise<CreateMerchantOutput> {
    const merchant = await this.factory.createMerchant(user, input);
    return { ok: true, merchant };
  }

  @Mutation(() => UpdateMerchantOutput)
  @Role(['Owner'])
  async updateMerchant(
    @Args('UpdateMerchantInput') input: UpdateMerchantInput,
    @AuthUser() user: User,
  ): Promise<UpdateMerchantOutput> {
    const merchant = await this.factory.updateMerchant(user, input);
    return { ok: true, merchantId: merchant.id };
  }

  @Query(() => FindAllCategoriesOutput)
  async findAllCategories() {
    const categories = await this.factory.findAllCategories();
    return {
      ok: true,
      categories,
    };
  }

  @Query(() => FindMerchantByCategoryOutput)
  async findMerchantByCategory(
    @Args('FindMerchantByCategoryInput') input: FindMerchantByCategoryInput,
  ) {
    const { total, merchants } =
      await this.factory.findMerchantByCategory(input);
    return {
      ok: true,
      total,
      merchants,
    };
  }

  @Query(() => SearchMerchantOutput)
  async searchMerchant(
    @Args('SearchMerchantInput') input: SearchMerchantInput,
  ) {
    const { total, merchants } = await this.factory.searchMerchant(input);
    return {
      ok: true,
      total,
      merchants,
    };
  }
}
