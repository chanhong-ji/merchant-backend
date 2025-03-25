import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import {
  ICreateProductInput,
  ICreateProductOutput,
} from '../../application/dto/create-product.dto';
import { ProductDto } from './abstract/product.dto';
import { IsInt } from 'class-validator';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class CreateProductInput
  extends PickType(
    ProductDto,
    ['name', 'price', 'description', 'options'],
    InputType,
  )
  implements ICreateProductInput
{
  @Field(() => Int, { description: '판매처 아이디' })
  @IsInt()
  merchantId: number;
}

@ObjectType()
export class CreateProductOutput
  extends BaseOutput
  implements ICreateProductOutput
{
  @Field(() => Int, { description: '생성된 상품 아이디' })
  productId: number;
}
