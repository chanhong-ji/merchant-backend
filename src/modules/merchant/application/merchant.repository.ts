import { Category } from '../domain/entity/category.entity';
import { Merchant } from '../domain/entity/merchant.entity';

export interface MerchantRepository {
  findById(id: number): Promise<Merchant | null>;
  save(merchant: Merchant): Promise<Merchant>;
  findCategoryById(id: number): Promise<Category | null>;
}
