import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from './model/product.model';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entity/product.entity';
import { ProductRepository } from '../../application/repository/product.repository';

@Injectable()
export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<Product>,
  ) {}
}
