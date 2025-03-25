import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryModel } from '../model/category.model';
import { Repository } from 'typeorm';
import { Category } from 'src/modules/merchant/domain/entity/category.entity';
import { CategoryRepository } from 'src/modules/merchant/application/repository/category.repository';

@Injectable()
export class TypeormCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  findById(id: number): Promise<Category | null> {
    return this.repository.findOne({ where: { id } });
  }
}
