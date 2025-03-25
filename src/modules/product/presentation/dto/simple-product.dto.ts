import { ObjectType, PickType } from '@nestjs/graphql';
import { ProductDto } from './abstract/product.dto';

@ObjectType()
export class SimpleProductDto extends PickType(
  ProductDto,
  ['id', 'name', 'price', 'photo', 'description', 'options'],
  ObjectType,
) {}
