import { Merchant } from '../../domain/entity/merchant.entity';

export interface IFindMerchantByIdInput {
  id: number;
}

export interface IFindMerchantByIdOutput {
  merchant?: Merchant;
}
