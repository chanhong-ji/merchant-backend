import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MerchantRepository } from '../../../modules/merchant/application/merchant.repository';
import { MerchantModel } from './model/merchant.model';
import { Merchant } from '../../../modules/merchant/domain/entity/merchant.entity';
import { Category } from '../../../modules/merchant/domain/entity/category.entity';
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

  searchByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<[Merchant[], number]> {
    return this.repository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  countByCategoryId(categoryId: number): Promise<number> {
    return this.repository.count({ where: { category: { id: categoryId } } });
  }
}
