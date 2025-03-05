import { Module } from '@nestjs/common';
import { MerchantResolver } from './merchant.resolver';
import { MerchantFactory } from './domain/merchant.factory';
import { TypeormMerchantRepository } from './infrastructure/typeorm/typeorm-merchant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantModel } from './infrastructure/typeorm/merchant.model';
import { CreateMerchantUsecase } from './domain/usecase/create-merchant.usecase';
import { FindMerchantsUsecase } from './domain/usecase/find-merchants.usecase';
import { UpdateMerchantUsecase } from './domain/usecase/update-merchant.usecase';
import { MerchantSubscriber } from './infrastructure/typeorm/merchant.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([MerchantModel])],
  providers: [
    MerchantResolver,
    MerchantFactory,
    TypeormMerchantRepository,
    MerchantSubscriber,
    /** Usecases */
    CreateMerchantUsecase,
    FindMerchantsUsecase,
    UpdateMerchantUsecase,
  ],
})
export class MerchantModule {}
