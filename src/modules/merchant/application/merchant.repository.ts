import { Merchant } from '../domain/merchant.entity';

export interface MerchantRepository {
  findAll(): Promise<Merchant[]>;
  findById(id: number): Promise<Merchant | null>;
  save(merchant: Merchant): Promise<Merchant>;
}
