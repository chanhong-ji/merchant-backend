import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SimpleMerchantDto } from './simple-merchant.dto';
import { Merchant } from '../../domain/entity/merchant.entity';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/modules/shared/presentation/dto/pagination.dto';
import {
  ISearchMerchantInput,
  ISearchMerchantOutput,
} from '../../application/dto/search-merchant.dto';

@InputType()
export class SearchMerchantInput
  extends PaginationInput
  implements ISearchMerchantInput
{
  @Field(() => String, { description: '판매처 이름' })
  name: string;
}

@ObjectType()
export class SearchMerchantOutput
  extends PaginationOutput
  implements ISearchMerchantOutput
{
  @Field(() => [SimpleMerchantDto], { description: '판매처 목록' })
  merchants?: Merchant[];
}
