import { IMerchant } from '../../domain/merchant.interface';

export interface IUpdateMerchantInput
  extends Partial<
    Pick<IMerchant, 'name' | 'address' | 'coverImage' | 'dongCode'>
  > {
  id: number;
}
