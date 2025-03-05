import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/merchant.repository';
import { IUpdateMerchantInput } from '../../application/dto/update-merchant.dto';
import { Merchant } from '../merchant.entity';

@Injectable()
export class UpdateMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
  ) {}
  async execute(input: IUpdateMerchantInput): Promise<Merchant> {
    const merchant = await this.repository.findById(input.id);
    if (!merchant) {
      throw new Error('Merchant not found');
    }
    const updated = merchant.update(input);
    const result = await this.repository.save(updated);
    return result;
  }
}
