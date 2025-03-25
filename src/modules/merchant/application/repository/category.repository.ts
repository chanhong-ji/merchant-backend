import { Category } from '../../domain/entity/category.entity';

export interface CategoryRepository {
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}
