import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantRepository } from '../../application/merchant.repository';
import { MerchantModel } from './model/merchant.model';
import { Merchant } from '../../domain/entity/merchant.entity';
import { Category } from '../../domain/entity/category.entity';
import { CategoryModel } from './model/category.model';

@Injectable()
export class TypeormMerchantRepository implements MerchantRepository {
  constructor(
    @InjectRepository(MerchantModel)
    private readonly repository: Repository<Merchant>,
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  findAll(): Promise<Merchant[]> {
    return this.repository.find();
  }
  findById(id: number): Promise<Merchant | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
  save(merchant: Merchant): Promise<Merchant> {
    return this.repository.save(merchant);
  }
  findCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }
  findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { id: 'ASC' } });
  }
  findAllByCategoryId(
    categoryId: number,
    page: number,
    limit: number,
  ): Promise<Merchant[]> {
    return this.repository.find({
      where: { category: { id: categoryId } },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  countByCategoryId(categoryId: number): Promise<number> {
    return this.repository.count({ where: { category: { id: categoryId } } });
  }
}
