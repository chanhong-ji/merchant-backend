import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantRepository } from '../../application/merchant.repository';
import { MerchantModel } from './model/merchant.model';
import { Merchant } from '../../domain/entity/merchant.entity';

@Injectable()
export class TypeormMerchantRepository implements MerchantRepository {
  constructor(
    @InjectRepository(MerchantModel)
    private readonly repository: Repository<Merchant>,
  ) {}
  findAll(): Promise<Merchant[]> {
    return this.repository.find();
  }
  findById(id: number): Promise<Merchant | null> {
    return this.repository.findOne({ where: { id } });
  }
  save(merchant: Merchant): Promise<Merchant> {
    return this.repository.save(merchant);
  }
}
