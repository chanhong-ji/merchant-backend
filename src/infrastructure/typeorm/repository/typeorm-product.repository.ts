import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../model/product.model';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { ProductRepository } from 'src/modules/product/application/repository/product.repository';

@Injectable()
export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<Product>,
  ) {}
}
