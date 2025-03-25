import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/repository/product.repository';
import { ICreateProductInput } from '../../application/dto/create-product.dto';
import { Product } from '../entity/product.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { MerchantRepository } from 'src/modules/merchant/application/repository/merchant.repository';
import { ErrorService } from 'src/common/error/error.service';
import { CustomGraphQLError } from 'src/common/error/custom-graphql-error';

@Injectable()
export class CreateProductUsecase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @Inject('MerchantRepository')
    private readonly merchantRepo: MerchantRepository,
    private readonly errorService: ErrorService,
  ) {}

  async execute(input: ICreateProductInput, user: User): Promise<Product> {
    const merchant = await this.merchantRepo.findById(input.merchantId);
    if (merchant?.ownerId !== user.id) {
      throw new CustomGraphQLError(this.errorService.get('PERMISSION_DENIED'), {
        level: 'warn',
      });
    }
    const product = Product.create({
      description: input.description,
      name: input.name,
      options: input.options,
      price: input.price,
    });
    product.merchant = merchant;
    return this.productRepo.save(product);
  }
}
