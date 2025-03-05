import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MerchantFactory } from '../merchant/domain/merchant.factory';
import {
  CreateMerchantInput,
  CreateMerchantOutput,
} from './presentation/dto/create-merchant.dto';
import { FindMerchantsOutput } from './presentation/dto/find-merchants.dto';

@Resolver()
export class MerchantResolver {
  constructor(private readonly factory: MerchantFactory) {}

  @Mutation(() => CreateMerchantOutput)
  async createMerchant(
    @Args('CreateMerchantInput') input: CreateMerchantInput,
  ): Promise<CreateMerchantOutput> {
    const merchant = await this.factory.createMerchant(input);
    return { ok: true, merchant };
  }

  @Query(() => FindMerchantsOutput)
  async findMerchants(): Promise<FindMerchantsOutput> {
    const merchants = await this.factory.findMerchants();
    return { ok: true, merchants };
  }
}
