import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/repository/product.repository';
import { MerchantRepository } from 'src/modules/merchant/application/repository/merchant.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class RemoveProductUsecase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    private readonly error: ErrorService,
  ) {}
  async execute(id: number, user: User): Promise<void> {
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new CustomGraphQLError(this.error.get('PRODUCT_NOT_FOUND'), {
        level: 'log',
      });
    }
    if (product.merchant.ownerId !== user.id) {
      throw new CustomGraphQLError(this.error.get('PERMISSION_DENIED'), {
        level: 'warn',
      });
    }
    await this.productRepo.remove(id);
  }
}
