import { Module } from '@nestjs/common';
import { MerchantResolver } from './merchant.resolver';
import { MerchantFactory } from './domain/merchant.factory';
import { CreateMerchantUsecase } from './domain/usecase/create-merchant.usecase';
import { UpdateMerchantUsecase } from './domain/usecase/update-merchant.usecase';
import { MerchantSubscriber } from 'src/infrastructure/typeorm/subscriber/merchant.subscriber';
import { CategorySubscriber } from 'src/infrastructure/typeorm/subscriber/category.subscriber';
import { FindAllCategoriesUsecase } from './domain/usecase/find-all-categories.usecase';
import { FindMerchantByCategoryUsecase } from './domain/usecase/find-merchant-by-category.usecase';
import { SearchMerchantUsecase } from './domain/usecase/search-merchant.usecase';
import { RepositoryModule } from 'src/infrastructure/typeorm/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    MerchantResolver,
    MerchantFactory,
    MerchantSubscriber,
    CategorySubscriber,

    /** Usecases */
    CreateMerchantUsecase,
    UpdateMerchantUsecase,
    FindAllCategoriesUsecase,
    FindMerchantByCategoryUsecase,
    SearchMerchantUsecase,
  ],
})
export class MerchantModule {}
