import { Injectable } from '@nestjs/common';
import { Merchant } from './entity/merchant.entity';
import { CreateMerchantUsecase } from './usecase/create-merchant.usecase';
import { ICreateMerchantInput } from '../application/dto/create-merchant.dto';
import { IUpdateMerchantInput } from '../application/dto/update-merchant.dto';
import { UpdateMerchantUsecase } from './usecase/update-merchant.usecase';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { FindAllCategoriesUsecase } from './usecase/find-all-categories.usecase';
import { Category } from './entity/category.entity';
import { FindMerchantByCategoryUsecase } from './usecase/find-merchant-by-category.usecase';
import { IFindMerchantByCategoryInput } from '../application/dto/find-merchant-by-category.dto';

@Injectable()
export class MerchantFactory {
  constructor(
    private readonly createMerchantUsecase: CreateMerchantUsecase,
    private readonly updateMerchantUsecase: UpdateMerchantUsecase,
    private readonly findAllCategoriesUsecase: FindAllCategoriesUsecase,
    private readonly findMerchantByCategoryUsecase: FindMerchantByCategoryUsecase,
  ) {}

  async createMerchant(
    user: User,
    input: ICreateMerchantInput,
  ): Promise<Merchant> {
    return this.createMerchantUsecase.execute(user, input);
  }

  async updateMerchant(
    user: User,
    input: IUpdateMerchantInput,
  ): Promise<Merchant> {
    return this.updateMerchantUsecase.execute(user, input);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.findAllCategoriesUsecase.execute();
  }

  async findMerchantByCategory(input: IFindMerchantByCategoryInput) {
    return this.findMerchantByCategoryUsecase.execute(input);
  }
}
