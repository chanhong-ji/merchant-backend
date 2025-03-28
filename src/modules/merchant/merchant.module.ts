import { Module } from '@nestjs/common';
import { MerchantResolver } from './merchant.resolver';
import { MerchantFactory } from './domain/merchant.factory';
import { TypeormMerchantRepository } from './infrastructure/typeorm/typeorm-merchant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantModel } from './infrastructure/typeorm/model/merchant.model';
import { CreateMerchantUsecase } from './domain/usecase/create-merchant.usecase';
import { FindMerchantsUsecase } from './domain/usecase/find-merchants.usecase';
import { UpdateMerchantUsecase } from './domain/usecase/update-merchant.usecase';
import { MerchantSubscriber } from './infrastructure/typeorm/merchant.subscriber';
import { CategoryModel } from './infrastructure/typeorm/model/category.model';
import { CategorySubscriber } from './infrastructure/typeorm/category.subscriber';
import { MerchantErrorService } from './domain/error/merchant-error.service';

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
    FindMerchantsUsecase,
    UpdateMerchantUsecase,
  ],
})
export class MerchantModule {}
