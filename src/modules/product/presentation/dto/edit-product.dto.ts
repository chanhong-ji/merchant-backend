import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import {
  IEditProductInput,
  IEditProductOutput,
} from '../../application/dto/edit-product.dto';
import { ProductDto } from './product.dto';
import { Product } from '../../domain/entity/product.entity';
import { SimpleProductDto } from './simple-product.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class EditProductInput
  extends PartialType(
    PickType(
      ProductDto,
      ['name', 'price', 'photo', 'description', 'options'],
      InputType,
    ),
  )
  implements IEditProductInput
{
  @Field(() => Int, { description: '상품 아이디' })
  productId: number;
}

@ObjectType()
export class EditProductOutput
  extends BaseOutput
  implements IEditProductOutput
{
  @Field(() => SimpleProductDto)
  product: Product;
}
