import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/merchant.repository';
import { TypeormMerchantRepository } from '../../infrastructure/typeorm/typeorm-merchant.repository';
import { Merchant } from '../merchant.entity';

@Injectable()
export class FindMerchantsUsecase {
  constructor(
    @Inject(TypeormMerchantRepository)
    private readonly repository: MerchantRepository,
  ) {}
  async execute(): Promise<Merchant[]> {
    return await this.repository.findAll();
  }
}
