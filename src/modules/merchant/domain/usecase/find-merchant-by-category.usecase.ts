import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/merchant.repository';
import { MerchantErrorService } from '../error/merchant-error.service';
import {
  IFindMerchantByCategoryInput,
  IFindMerchantByCategoryOutput,
} from '../../application/dto/find-merchant-by-category.dto';

@Injectable()
export class FindMerchantByCategoryUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
    private readonly errorService: MerchantErrorService,
  ) {}
  async execute(
    input: IFindMerchantByCategoryInput,
  ): Promise<IFindMerchantByCategoryOutput> {
    const category = await this.repository.findCategoryById(input.categoryId);
    if (!category) {
      throw new Error(this.errorService.get('CATEGORY_NOT_FOUND'));
    }
    const merchants = await this.repository.findAllByCategoryId(
      category.id,
      input.page,
      input.limit,
    );
    const total = await this.repository.countByCategoryId(category.id);
    return { total, merchants };
  }
}
