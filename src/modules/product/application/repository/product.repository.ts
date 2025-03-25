import { Product } from '../../domain/entity/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findByIds(merchantId: number, ids: number[]): Promise<Product[]>;
  remove(id: number): Promise<void>;
}
