import { Module } from '@nestjs/common';
import { MerchantResolver } from './merchant.resolver';
import { MerchantFactory } from './domain/merchant.factory';
import { TypeormMerchantRepository } from '../../infrastructure/merchant/repository-impl/typeorm-merchant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantModel } from 'src/infrastructure/merchant/model/merchant.model';
import { CreateMerchantUsecase } from './domain/usecase/create-merchant.usecase';
import { UpdateMerchantUsecase } from './domain/usecase/update-merchant.usecase';
import { MerchantSubscriber } from '../../infrastructure/merchant/repository-impl/merchant.subscriber';
import { CategoryModel } from 'src/infrastructure/merchant/model/category.model';
import { CategorySubscriber } from '../../infrastructure/merchant/repository-impl/category.subscriber';
import { MerchantErrorService } from './domain/error/merchant-error.service';
import { FindAllCategoriesUsecase } from './domain/usecase/find-all-categories.usecase';
import { FindMerchantByCategoryUsecase } from './domain/usecase/find-merchant-by-category.usecase';
import { SearchMerchantUsecase } from './domain/usecase/search-merchant.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([MerchantModel, CategoryModel])],
  providers: [
    MerchantResolver,
    MerchantFactory,
    { provide: 'MerchantRepository', useClass: TypeormMerchantRepository },
    MerchantSubscriber,
    CategorySubscriber,
    MerchantErrorService,
    /** Usecases */
    CreateMerchantUsecase,
    UpdateMerchantUsecase,
    FindAllCategoriesUsecase,
    FindMerchantByCategoryUsecase,
    SearchMerchantUsecase,
  ],
})
export class MerchantModule {}
