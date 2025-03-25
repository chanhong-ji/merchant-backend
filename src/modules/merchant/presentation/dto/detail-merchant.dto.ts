import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { MerchantDto } from './merchant.dto';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { SimpleProductDto } from '../../../product/presentation/dto/simple-product.dto';

@ObjectType()
export class DetailMerchantDto extends PickType(MerchantDto, [
  'id',
  'name',
  'address',
  'dongCode',
  'coverImage',
]) {
  @Field(() => [SimpleProductDto])
  products: Product[];
}
