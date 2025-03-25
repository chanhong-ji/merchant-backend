import { Inject, Injectable } from '@nestjs/common';
import { IFindMerchantByIdInput } from '../../application/dto/find-merchant-by-id.dto';
import { Merchant } from '../entity/merchant.entity';
import { MerchantRepository } from '../../application/repository/merchant.repository';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class FindMerchantByIdUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly merchantRepo: MerchantRepository,
    private readonly errorService: ErrorService,
  ) {}
  async execute(input: IFindMerchantByIdInput): Promise<Merchant> {
    const merchant = await this.merchantRepo.findById(input.id);
    if (!merchant) {
      throw new CustomGraphQLError(
        this.errorService.get('MERCHANT_NOT_FOUND'),
        { level: 'log' },
      );
    }
    return merchant;
  }
}
