import { Category } from '../domain/entity/category.entity';
import { Merchant } from '../domain/entity/merchant.entity';

export interface MerchantRepository {
  findById(id: number): Promise<Merchant | null>;
  save(merchant: Merchant): Promise<Merchant>;
  findCategoryById(id: number): Promise<Category | null>;
  findAllCategories(): Promise<Category[]>;
  findAllByCategoryId(
    categoryId: number,
    page: number,
    limit: number,
  ): Promise<Merchant[]>;
  searchByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<[Merchant[], number]>;
  countByCategoryId(categoryId: number): Promise<number>;
}
