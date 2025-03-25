import { Product } from '../../domain/entity/product.entity';

export interface IEditProductInput
  extends Partial<
    Pick<Product, 'name' | 'price' | 'photo' | 'description' | 'options'>
  > {
  productId: number;
}

export interface IEditProductOutput {
  product: Product;
}
