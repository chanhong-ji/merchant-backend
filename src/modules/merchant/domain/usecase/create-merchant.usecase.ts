import { Inject, Injectable } from '@nestjs/common';
import { ICreateMerchantInput } from '../../application/dto/create-merchant.dto';
import { MerchantRepository } from '../../application/merchant.repository';
import { Merchant } from '../entity/merchant.entity';

@Injectable()
export class CreateMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
  ) {}
  async execute(input: ICreateMerchantInput): Promise<Merchant> {
    const merchant = Merchant.create(input);
    return this.repository.save(merchant);
  }
}
