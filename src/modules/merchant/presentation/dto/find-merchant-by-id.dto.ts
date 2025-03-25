import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IFindMerchantByIdInput,
  IFindMerchantByIdOutput,
} from '../../application/dto/find-merchant-by-id.dto';
import { Merchant } from '../../domain/entity/merchant.entity';
import { DetailMerchantDto } from './detail-merchant.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class FindMerchantByIdInput implements IFindMerchantByIdInput {
  @Field(() => Int, { description: '판매처 아이디' })
  id: number;
}

@ObjectType()
export class FindMerchantByIdOutput
  extends BaseOutput
  implements IFindMerchantByIdOutput
{
  @Field(() => DetailMerchantDto, { nullable: true, description: '판매처' })
  merchant?: Merchant;
}
