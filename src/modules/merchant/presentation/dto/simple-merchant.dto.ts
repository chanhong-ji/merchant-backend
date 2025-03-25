import { ObjectType, PickType } from '@nestjs/graphql';
import { MerchantDto } from './merchant.dto';

@ObjectType()
export class SimpleMerchantDto extends PickType(MerchantDto, [
  'id',
  'name',
  'address',
  'dongCode',
  'coverImage',
]) {}
