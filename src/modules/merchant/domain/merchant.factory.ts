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
import {
  ISearchMerchantInput,
  ISearchMerchantOutput,
} from '../application/dto/search-merchant.dto';
import { SearchMerchantUsecase } from './usecase/search-merchant.usecase';
import { FindMerchantByIdUsecase } from './usecase/find-merchant-by-id.usecase';
import { IFindMerchantByIdInput } from '../application/dto/find-merchant-by-id.dto';

@Injectable()
export class MerchantFactory {
  constructor(
    private readonly createMerchantUsecase: CreateMerchantUsecase,
    private readonly updateMerchantUsecase: UpdateMerchantUsecase,
    private readonly findAllCategoriesUsecase: FindAllCategoriesUsecase,
    private readonly findMerchantByCategoryUsecase: FindMerchantByCategoryUsecase,
    private readonly searchMerchantUsecase: SearchMerchantUsecase,
    private readonly findMerchantByIdUsecase: FindMerchantByIdUsecase,
  ) {}

  findMerchantById(input: IFindMerchantByIdInput): Promise<Merchant> {
    return this.findMerchantByIdUsecase.execute(input);
  }
  createMerchant(user: User, input: ICreateMerchantInput): Promise<Merchant> {
    return this.createMerchantUsecase.execute(user, input);
  }

  updateMerchant(user: User, input: IUpdateMerchantInput): Promise<Merchant> {
    return this.updateMerchantUsecase.execute(user, input);
  }

  findAllCategories(): Promise<Category[]> {
    return this.findAllCategoriesUsecase.execute();
  }

  findMerchantByCategory(input: IFindMerchantByCategoryInput) {
    return this.findMerchantByCategoryUsecase.execute(input);
  }

  searchMerchant(input: ISearchMerchantInput): Promise<ISearchMerchantOutput> {
    return this.searchMerchantUsecase.execute(input);
  }
}
