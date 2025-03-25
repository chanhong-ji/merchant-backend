import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../../application/repository/category.repository';

@Injectable()
export class FindAllCategoriesUsecase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}
  async execute(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
