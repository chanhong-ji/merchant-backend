import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/repository/merchant.repository';
import { MerchantErrorService } from '../error/merchant-error.service';
import {
  IFindMerchantByCategoryInput,
  IFindMerchantByCategoryOutput,
} from '../../application/dto/find-merchant-by-category.dto';
import { CategoryRepository } from '../../application/repository/category.repository';

@Injectable()
export class FindMerchantByCategoryUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly merchantRepo: MerchantRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
    private readonly errorService: MerchantErrorService,
  ) {}
  async execute(
    input: IFindMerchantByCategoryInput,
  ): Promise<IFindMerchantByCategoryOutput> {
    const category = await this.merchantRepo.findById(input.categoryId);
    if (!category) {
      throw new Error(this.errorService.get('CATEGORY_NOT_FOUND'));
    }
    const merchants = await this.merchantRepo.findAllByCategoryId(
      category.id,
      input.page,
      input.limit,
    );
    const total = await this.merchantRepo.countByCategoryId(category.id);
    return { total, merchants };
  }
}
