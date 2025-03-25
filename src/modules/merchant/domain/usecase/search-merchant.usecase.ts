import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/repository/merchant.repository';
import {
  ISearchMerchantInput,
  ISearchMerchantOutput,
} from '../../application/dto/search-merchant.dto';

@Injectable()
export class SearchMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
  ) {}
  async execute(input: ISearchMerchantInput): Promise<ISearchMerchantOutput> {
    const [merchants, total] = await this.repository.searchByName(
      input.name,
      input.page,
      input.limit,
    );
    return { total, merchants };
  }
}
