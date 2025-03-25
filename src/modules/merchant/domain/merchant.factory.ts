import { Injectable } from '@nestjs/common';
import { Merchant } from './entity/merchant.entity';
import { CreateMerchantUsecase } from './usecase/create-merchant.usecase';
import { ICreateMerchantInput } from '../application/dto/create-merchant.dto';
import { FindMerchantsUsecase } from './usecase/find-merchants.usecase';
import { IUpdateMerchantInput } from '../application/dto/update-merchant.dto';
import { UpdateMerchantUsecase } from './usecase/update-merchant.usecase';

@Injectable()
export class MerchantFactory {
  constructor(
    private readonly createMerchantUsecase: CreateMerchantUsecase,
    private readonly findMerchantsUsecase: FindMerchantsUsecase,
    private readonly updateMerchantUsecase: UpdateMerchantUsecase,
  ) {}

  async createMerchant(input: ICreateMerchantInput): Promise<Merchant> {
    return this.createMerchantUsecase.execute(input);
  }

  async findMerchants(): Promise<Merchant[]> {
    return this.findMerchantsUsecase.execute();
  }

  async updateMerchant(input: IUpdateMerchantInput): Promise<Merchant> {
    return this.updateMerchantUsecase.execute(input);
  }
}
