import { Inject, Injectable } from '@nestjs/common';
import { MerchantRepository } from '../../application/merchant.repository';
import { Category } from '../entity/category.entity';

@Injectable()
export class FindAllCategoriesUsecase {
  constructor(
    @Inject('MerchantRepository')
    private readonly repository: MerchantRepository,
  ) {}
  async execute(): Promise<Category[]> {
    return this.repository.findAllCategories();
  }
}
