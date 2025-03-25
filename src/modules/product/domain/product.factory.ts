import { Injectable } from '@nestjs/common';
import { CreateProductUsecase } from './usecase/create-product.usecase';
import { ICreateProductInput } from '../application/dto/create-product.dto';
import { Product } from './entity/product.entity';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { RemoveProductUsecase } from './usecase/remove-product.usecase';
import { IEditProductInput } from '../application/dto/edit-product.dto';
import { EditProductUsecase } from './usecase/edit-product.usecase';

@Injectable()
export class ProductFactory {
  constructor(
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly removeProductUsecase: RemoveProductUsecase,
    private readonly editProductUsecase: EditProductUsecase,
  ) {}

  createProduct(input: ICreateProductInput, user: User): Promise<Product> {
    return this.createProductUsecase.execute(input, user);
  }
  removeProduct(id: number, user: User): Promise<void> {
    return this.removeProductUsecase.execute(id, user);
  }
  //TODO : EditProduct 추가
  editProduct(input: IEditProductInput, user: User): Promise<Product> {
    return this.editProductUsecase.execute(input, user);
  }
}
