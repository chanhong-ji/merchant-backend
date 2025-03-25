import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max } from 'class-validator';
import {
  IFindMerchantByCategoryInput,
  IFindMerchantByCategoryOutput,
} from '../../application/dto/find-merchant-by-category.dto';
import { SimpleMerchantDto } from './simple.dto';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/modules/common/presentation/dto/pagination.dto';
import { Merchant } from '../../domain/entity/merchant.entity';

@InputType()
export class FindMerchantByCategoryInput
  extends PaginationInput
  implements IFindMerchantByCategoryInput
{
  @Field(() => Number, { description: '카테고리 아이디' })
  @IsInt()
  categoryId: number;
}

@ObjectType()
export class FindMerchantByCategoryOutput
  extends PaginationOutput
  implements IFindMerchantByCategoryOutput
{
  @Field(() => [SimpleMerchantDto], { description: '판매자 목록' })
  merchants: Merchant[];
}
