import { Inject, Injectable } from '@nestjs/common';
import { ICreateMerchantInput } from '../../application/dto/create-merchant.dto';
import { MerchantRepository } from '../../application/merchant.repository';
import { Merchant } from '../entity/merchant.entity';
import { MerchantErrorService } from '../error/merchant-error.service';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class CreateMerchantUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
    private readonly errorService: MerchantErrorService,
  ) {}
  async execute(user: User, input: ICreateMerchantInput): Promise<Merchant> {
    const category = await this.repository.findCategoryById(input.categoryId);
    if (!category) {
      throw new Error(this.errorService.get('CATEGORY_NOT_FOUND'));
    }
    const merchant = Merchant.create(input);
    merchant.category = category;
    merchant.owner = user;
    return this.repository.save(merchant);
  }
}
