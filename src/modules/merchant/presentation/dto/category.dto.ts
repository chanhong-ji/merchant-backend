import { Field, InputType, ObjectType, Parent } from '@nestjs/graphql';
import { ICategory } from '../../domain/interface/category.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/merchant.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class CategoryDto implements ICategory {
  @Field((type) => Number, { description: '카테고리 아이디' })
  @IsInt()
  id: number;

  @Field((type) => String, { description: '카테고리 이름' })
  @IsString()
  name: string;

  @Field((type) => String, {
    description: '카테고리 커버 이미지',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  coverImg?: string;

  @Field((type) => [MerchantDto], { description: '판매자 목록' })
  merchants: MerchantDto[];

  @Field((type) => Date, { description: '생성일' })
  createdAt: Date;

  @Field((type) => Date, { description: '수정일' })
  updatedAt: Date;
}
