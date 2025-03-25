import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormMerchantRepository } from './repository/typeorm-merchant.repository';
import { TypeormProductRepository } from './repository/typeorm-product.repository';
import { TypeormUserRepository } from './repository/typeorm-user.repository';
import { UserModel } from './model/user.model';
import { MerchantModel } from './model/merchant.model';
import { ProductModel } from './model/product.model';
import { CategoryModel } from './model/category.model';
import { VerificationModel } from './model/verification.model';
import { TypeormCategoryRepository } from './repository/typeorm-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      MerchantModel,
      ProductModel,
      CategoryModel,
      VerificationModel,
    ]),
  ],
  providers: [
    { provide: 'MerchantRepository', useClass: TypeormMerchantRepository },
    { provide: 'ProductRepository', useClass: TypeormProductRepository },
    { provide: 'CategoryRepository', useClass: TypeormCategoryRepository },
    { provide: 'UserRepository', useClass: TypeormUserRepository },
  ],
  exports: [
    'MerchantRepository',
    'ProductRepository',
    'UserRepository',
    'CategoryRepository',
  ],
})
export class RepositoryModule {}
