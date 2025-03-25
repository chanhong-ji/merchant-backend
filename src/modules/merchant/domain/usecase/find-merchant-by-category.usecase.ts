import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/repository/merchant.repository';
import {
  IFindMerchantByCategoryInput,
  IFindMerchantByCategoryOutput,
} from '../../application/dto/find-merchant-by-category.dto';
import { CategoryRepository } from '../../application/repository/category.repository';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class FindMerchantByCategoryUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly merchantRepo: MerchantRepository,
    @Inject('CategoryRepository')
    private readonly categoryRepo: CategoryRepository,
    private readonly errorService: ErrorService,
  ) {}
  async execute(
    input: IFindMerchantByCategoryInput,
  ): Promise<IFindMerchantByCategoryOutput> {
    const category = await this.merchantRepo.findById(input.categoryId);
    if (!category) {
      throw new CustomGraphQLError(
        this.errorService.get('CATEGORY_NOT_FOUND'),
        { level: 'log' },
      );
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
