import { IMerchant } from '../../domain/interface/merchant.interface';

export interface ICreateMerchantInput
  extends Pick<IMerchant, 'name' | 'address' | 'coverImage' | 'dongCode'> {}

export interface ICreateMerchantOutput {
  merchant: IMerchant;
}
