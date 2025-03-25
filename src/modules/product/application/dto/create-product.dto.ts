import { Product } from '../../domain/entity/product.entity';

export interface ICreateProductInput
  extends Pick<Product, 'name' | 'price' | 'description' | 'options'> {
  merchantId: number;
}

export interface ICreateProductOutput {
  productId: number;
}
