import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString, Length } from 'class-validator';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { IProduct } from '../../domain/interface/product.interface';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/merchant.dto';

@InputType({ isAbstract: true })
@ObjectType()
export class ProductDto implements IProduct {
  @Field(() => Int, { description: '상품 아이디' })
  id: number;

  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Field(() => Int)
  @IsInt()
  price: number;

  @Field(() => String)
  @IsString()
  photo: string;

  @Field(() => String)
  @Length(5, 140)
  description: string;

  @Field(() => MerchantDto)
  merchant: Merchant;

  @Field(() => Int)
  merchantId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
