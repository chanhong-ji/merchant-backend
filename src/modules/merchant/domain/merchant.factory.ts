import { Injectable } from '@nestjs/common';
import { Merchant } from './merchant.entity';
import { CreateMerchantUsecase } from './usecase/create-merchant.usecase';
import { ICreateMerchantInput } from '../application/dto/create-merchant.dto';

@Injectable()
export class MerchantFactory {
  constructor(
    private readonly createMerchantUsecase: CreateMerchantUsecase,
  ) {}

  async createMerchant(input: ICreateMerchantInput): Promise<Merchant> {
    return this.createMerchantUsecase.execute(input);
  }
}
