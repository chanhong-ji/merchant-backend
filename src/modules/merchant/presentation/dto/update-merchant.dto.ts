import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IUpdateMerchantInput } from '../../application/dto/update-merchant.dto';
import { MerchantDto } from './merchant.dto';
import { IsInt, IsOptional } from 'class-validator';
import { BaseOutput } from 'src/modules/common/presentation/output/base.output';

@InputType()
export class UpdateMerchantInput
  extends PartialType(
    PickType(MerchantDto, ['address', 'coverImage', 'dongCode', 'name']),
    InputType,
  )
  implements IUpdateMerchantInput
{
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => Int, { nullable: true, description: '카테고리 아이디' })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}

@ObjectType()
export class UpdateMerchantOutput extends BaseOutput {
  @Field(() => Number)
  merchantId: number;
}
