import { ArgsType, ObjectType, PickType } from '@nestjs/graphql';
import { ProductDto } from 'src/modules/product/presentation/dto/product.dto';

@ObjectType()
export class SimpleProductDto extends PickType(
  ProductDto,
  ['id', 'name', 'price', 'photo', 'description', 'options'],
  ObjectType,
) {}
