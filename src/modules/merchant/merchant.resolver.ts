import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MerchantFactory } from '../merchant/domain/merchant.factory';
import {
  CreateMerchantInput,
  CreateMerchantOutput,
} from './presentation/dto/create-merchant.dto';
import { FindMerchantsOutput } from './presentation/dto/find-merchants.dto';
import {
  UpdateMerchantInput,
  UpdateMerchantOutput,
} from './presentation/dto/update-merchant.dto';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User } from '../user/domain/entity/user.entity';
import { Role } from '../auth/decorator/role.decorator';

@Resolver()
export class MerchantResolver {
  constructor(private readonly factory: MerchantFactory) {}

  @Mutation(() => CreateMerchantOutput)
  @Role(['Owner'])
  async createMerchant(
    @Args('CreateMerchantInput') input: CreateMerchantInput,
    @AuthUser() user: User,
  ): Promise<CreateMerchantOutput> {
    const merchant = await this.factory.createMerchant(user, input);
    return { ok: true, merchant };
  }

  @Query(() => FindMerchantsOutput)
  @Role(['Client'])
  async findMerchants(): Promise<FindMerchantsOutput> {
    const merchants = await this.factory.findMerchants();
    return { ok: true, merchants };
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
}
