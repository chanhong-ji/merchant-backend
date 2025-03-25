import { IMerchant } from '../../domain/interface/merchant.interface';

export interface IUpdateMerchantInput
  extends Partial<
    Pick<IMerchant, 'name' | 'address' | 'coverImage' | 'dongCode'>
  > {
  id: number;
  categoryId?: number;
}
