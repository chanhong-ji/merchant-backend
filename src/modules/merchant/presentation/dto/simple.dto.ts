import { ObjectType, PickType } from '@nestjs/graphql';
import { MerchantDto } from './merchant.dto';

@ObjectType()
export class SimpleMerchantDto extends PickType(MerchantDto, [
  'id',
  'address',
  'dongCode',
  'coverImage',
]) {}
