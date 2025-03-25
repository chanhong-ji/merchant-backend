import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/repository/product.repository';
import { ErrorService } from 'src/common/error/error.service';
import { IEditProductInput } from '../../application/dto/edit-product.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Product } from '../entity/product.entity';

@Injectable()
export class EditProductUsecase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    private readonly error: ErrorService,
  ) {}

  async execute(input: IEditProductInput, user: User): Promise<Product> {
    const product = await this.productRepo.findById(input.productId);
    if (!product) {
      throw new Error(this.error.get('PRODUCT_NOT_FOUND'));
    }
    if (product.merchant.ownerId !== user.id) {
      throw new Error(this.error.get('PERMISSION_DENIED'));
    }
    product.update(input);
    return this.productRepo.save(product);
  }
}
