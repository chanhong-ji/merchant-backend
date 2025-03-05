import { Inject, Injectable } from '@nestjs/common';
import { ICreateMerchantInput } from '../../application/dto/create-merchant.dto';
import { MerchantRepository } from '../../application/merchant.repository';
import { TypeormMerchantRepository } from '../../infrastructure/typeorm/typeorm-merchant.repository';
import { Merchant } from '../merchant.entity';

@Injectable()
export class CreateMerchantUsecase {
  constructor(
    @Inject(TypeormMerchantRepository)
    private readonly repository: MerchantRepository,
  ) {}
  async execute(input: ICreateMerchantInput): Promise<Merchant> {
    const merchant = Merchant.create(input);
    return this.repository.save(merchant);
  }
}
