import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantRepository } from '../../application/merchant.repository';
import { MerchantModel } from './merchant.model';
import { Merchant } from '../../domain/merchant.entity';

@Injectable()
export class TypeormMerchantRepository implements MerchantRepository {
  constructor(
    @InjectRepository(MerchantModel)
    private readonly repository: Repository<MerchantModel>,
  ) {}
  create(merchant: Merchant): Promise<Merchant> {
    return this.repository.save(merchant);
  }
  findAll(): Promise<Merchant[]> {
    return this.repository.find();
}
