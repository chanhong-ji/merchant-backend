import { Field, InputType, Int, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { IUpdateProductInput, IUpdateProductOutput } from '../../application/dto/update-product.dto';
import { ProductDto } from './abstract/product.dto';
import { Product } from '../../domain/entity/product.entity';
import { SimpleProductDto } from './simple-product.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class UpdateProductInput
  extends PartialType(PickType(ProductDto, ['name', 'price', 'photo', 'description', 'options'], InputType))
  implements IUpdateProductInput
{
  @Field(() => Int, { description: '상품 아이디' })
  productId: number;
}

@ObjectType()
export class UpdateProductOutput extends BaseOutput implements IUpdateProductOutput {
  @Field(() => SimpleProductDto, { nullable: true })
  product?: Product;
}
