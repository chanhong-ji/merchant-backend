import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';
import { IProduct } from 'src/modules/product/domain/interface/product.interface';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/abstract/merchant.dto';
import { ProductOption } from 'src/modules/product/domain/entity/product-option.entity';
import { ProductOptionDto } from './product-option.dto';

@InputType({ isAbstract: true })
@ObjectType()
export class ProductDto implements IProduct {
  @Field(() => Int, { description: '상품 아이디' })
  id: number;

  @Field(() => String, { description: '상품 이름' })
  @IsString()
  name: string;

  @Field(() => Int, { description: '상품 가격' })
  @IsInt()
  price: number;

  @Field(() => String, { nullable: true, description: '상품 사진' })
  @IsOptional()
  @IsString()
  photo?: string;

  @Field(() => String, { description: '상품 설명' })
  @IsString()
  @Length(5, 140)
  description: string;

  @Field(() => [ProductOptionDto], { nullable: true, description: '상품 옵션' })
  options: ProductOption[];

  @Field(() => MerchantDto, { description: '상품 판매자' })
  merchant: Merchant;

  @Field(() => Int, { description: '상품 판매자 아이디' })
  merchantId: number;

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
