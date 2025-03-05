import { Merchant } from '../../domain/merchant.entity';

export interface ICreateMerchantInput
  extends Pick<Merchant, 'name' | 'address' | 'coverImage' | 'dongCode'> {}

export interface ICreateMerchantOutput {
  merchant: Merchant;
}
