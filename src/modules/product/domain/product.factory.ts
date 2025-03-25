import { Injectable } from '@nestjs/common';
import { CreateProductUsecase } from './usecase/create-product.usecase';
import { ICreateProductInput } from '../application/dto/create-product.dto';
import { Product } from './entity/product.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class ProductFactory {
  constructor(private readonly createProductUsecase: CreateProductUsecase) {}

  createProduct(input: ICreateProductInput, user: User): Promise<Product> {
    return this.createProductUsecase.execute(input, user);
  }
}
