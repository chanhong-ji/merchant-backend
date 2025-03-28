import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import {
  ICreateMerchantInput,
  ICreateMerchantOutput,
} from '../../application/dto/create-merchant.dto';
import { MerchantDto } from './merchant.dto';
import { BaseOutput } from 'src/modules/common/presentation/output/base.output';
import { IsInt } from 'class-validator';

@InputType('CreateMerchantInput')
export class CreateMerchantInput
  extends PickType(
    MerchantDto,
    ['name', 'address', 'coverImage', 'dongCode'],
    InputType,
  )
  implements ICreateMerchantInput
{
  @Field(() => Number)
  @IsInt()
  categoryId: number;
}

@ObjectType()
export class CreateMerchantOutput
  extends BaseOutput
  implements ICreateMerchantOutput
{
  @Field(() => MerchantDto)
  merchant: MerchantDto;
}
