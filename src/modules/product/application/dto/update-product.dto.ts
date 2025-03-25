import { Product } from '../../domain/entity/product.entity';

export interface IUpdateProductInput
  extends Partial<Pick<Product, 'name' | 'price' | 'photo' | 'description' | 'options'>> {
  productId: number;
}

export interface IUpdateProductOutput {
  product?: Product;
}
