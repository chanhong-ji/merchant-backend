import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ICategory } from '../../../domain/interface/category.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/abstract/merchant.dto';
import { Merchant } from 'src/modules/merchant/domain/entity/merchant.entity';

@ObjectType()
@InputType({ isAbstract: true })
export class CategoryDto implements ICategory {
  @Field(() => Number, { description: '카테고리 아이디' })
  @IsInt()
  id: number;

  @Field(() => String, { description: '카테고리 이름' })
  @IsString()
  name: string;

  @Field(() => String, {
    description: '카테고리 커버 이미지',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  coverImg?: string;

  @Field(() => String, { description: '카테고리 슬러그' })
  @IsString()
  slug: string;

  @Field(() => [MerchantDto], { description: '판매자 목록' })
  merchants: Merchant[];

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
