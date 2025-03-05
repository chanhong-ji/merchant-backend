import { BaseOutput } from 'src/modules/common/presentation/output/base.output';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { MerchantDto } from './merchant.dto';

@ObjectType()
class FindMerchants extends PickType(MerchantDto, ['id', 'address', 'name']) {}

@ObjectType()
export class FindMerchantsOutput extends BaseOutput {
  @Field(() => [FindMerchants])
  merchants: FindMerchants[];
}
