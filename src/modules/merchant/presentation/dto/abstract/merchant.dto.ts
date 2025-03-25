import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IMerchant } from '../../../domain/interface/merchant.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/modules/user/presentation/dto/user.dto';
import { CategoryDto } from './category.dto';
import { ProductDto } from 'src/modules/product/presentation/dto/product.dto';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { OrderDto } from 'src/modules/order/application/dto/order.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class MerchantDto implements IMerchant {
  @Field(() => Int, { description: '아이디' })
  @IsInt()
  id: number;

  @Field(() => String, { description: '이름' })
  @IsString()
  name: string;

  @Field(() => String, { nullable: true, description: '주소' })
  @IsString()
  address: string;

  @Field(() => String, { nullable: true, description: '커버 사진' })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @Field(() => String, { nullable: true, description: '동 코드' })
  @IsString()
  @IsOptional()
  dongCode?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserDto)
  owner: UserDto;

  @Field(() => OrderDto)
  orders: Order[];

  @Field(() => Int)
  ownerId: number;

  @Field(() => [ProductDto], { description: '상품 목록' })
  products: ProductDto[];

  @Field(() => CategoryDto, { description: '카테고리' })
  category: CategoryDto;
}
