import { Injectable } from '@nestjs/common';
import { Merchant } from './merchant.entity';
import { CreateMerchantUsecase } from './usecase/create-merchant.usecase';
import { ICreateMerchantInput } from '../application/dto/create-merchant.dto';
import { FindMerchantsUsecase } from './usecase/find-merchants.usecase';

@Injectable()
export class MerchantFactory {
  constructor(
    private readonly createMerchantUsecase: CreateMerchantUsecase,
    private readonly findMerchantsUsecase: FindMerchantsUsecase,
  ) {}

  async createMerchant(input: ICreateMerchantInput): Promise<Merchant> {
    return this.createMerchantUsecase.execute(input);
  }

  async findMerchants(): Promise<Merchant[]> {
    return this.findMerchantsUsecase.execute();
  }
}
