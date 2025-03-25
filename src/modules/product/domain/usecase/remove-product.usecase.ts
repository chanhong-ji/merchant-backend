import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/repository/product.repository';
import { MerchantRepository } from 'src/modules/merchant/application/repository/merchant.repository';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { ErrorService } from 'src/common/error/error.service';

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
      throw new Error(this.error.get('PRODUCT_NOT_FOUND'));
    }
    if (product.merchant.ownerId !== user.id) {
      throw new Error(this.error.get('PERMISSION_DENIED'));
    }
    await this.productRepo.remove(id);
  }
}
