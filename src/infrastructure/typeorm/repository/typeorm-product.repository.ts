import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../model/product.model';
import { In, Repository } from 'typeorm';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { ProductRepository } from 'src/modules/product/application/repository/product.repository';

@Injectable()
export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<Product>,
  ) {}
  findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      relations: { merchant: true },
    });
  }
  findByIds(merchantId: number, ids: number[]): Promise<Product[]> {
    return this.repository.find({
      where: { id: In(ids), merchant: { id: merchantId } },
    });
  }
  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
