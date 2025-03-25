import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IMerchant } from '../../../domain/interface/merchant.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/modules/user/presentation/dto/abstract/user.dto';
import { CategoryDto } from './category.dto';
import { ProductDto } from 'src/modules/product/presentation/dto/abstract/product.dto';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { OrderDto } from 'src/modules/order/presentation/dto/abstract/order.dto';
import { User } from 'src/modules/user/domain/entity/user.entity';
import { Product } from 'src/modules/product/domain/entity/product.entity';
import { Category } from 'src/modules/merchant/domain/entity/category.entity';

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

  @Field(() => UserDto, { description: '주인' })
  owner: User;

  @Field(() => OrderDto, { description: '주문 목록' })
  orders: Order[];

  @Field(() => Int)
  ownerId: number;

  @Field(() => [ProductDto], { description: '상품 목록' })
  products: Product[];

  @Field(() => CategoryDto, { description: '카테고리' })
  category: Category;

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
