import { ObjectType, PickType } from '@nestjs/graphql';
import { MerchantDto } from './abstract/merchant.dto';

@ObjectType()
export class SimpleMerchantDto extends PickType(MerchantDto, [
  'id',
  'name',
  'address',
  'dongCode',
  'coverImage',
]) {}
