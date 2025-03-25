import { Product } from '../../domain/entity/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
}
