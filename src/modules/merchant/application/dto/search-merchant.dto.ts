import {
  IPaginationInput,
  IPaginationOutput,
} from 'src/modules/shared/application/dto/pagination.dto';
import { Merchant } from '../../domain/entity/merchant.entity';

export interface ISearchMerchantInput extends IPaginationInput {
  name: string;
}

export interface ISearchMerchantOutput extends IPaginationOutput {
  merchants?: Merchant[];
}
