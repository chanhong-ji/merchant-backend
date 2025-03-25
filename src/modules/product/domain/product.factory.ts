import { Injectable } from '@nestjs/common';
import { CreateProductUsecase } from './usecase/create-product.usecase';
import { ICreateProductInput } from '../application/dto/create-product.dto';
import { Product } from './entity/product.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { RemoveProductUsecase } from './usecase/remove-product.usecase';
import { IUpdateProductInput } from '../application/dto/update-product.dto';
import { UpdateProductUsecase } from './usecase/update-product.usecase';

@Injectable()
export class ProductFactory {
  constructor(
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly removeProductUsecase: RemoveProductUsecase,
    private readonly updateProductUsecase: UpdateProductUsecase,
  ) {}

  createProduct(input: ICreateProductInput, user: User): Promise<Product> {
    return this.createProductUsecase.execute(input, user);
  }
  removeProduct(id: number, user: User): Promise<void> {
    return this.removeProductUsecase.execute(id, user);
  }
  //TODO : UpdateProduct 추가
  updateProduct(input: IUpdateProductInput, user: User): Promise<Product> {
    return this.updateProductUsecase.execute(input, user);
  }
}
