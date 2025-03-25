import {
  IPaginationInput,
  IPaginationOutput,
} from 'src/modules/common/application/dto/pagination.dto';
import { Merchant } from '../../domain/entity/merchant.entity';
export interface IFindMerchantByCategoryInput extends IPaginationInput {
  categoryId: number;
}

export interface IFindMerchantByCategoryOutput extends IPaginationOutput {
  merchants?: Merchant[];
}
