import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IMerchant } from '../../domain/interface/merchant.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/modules/user/presentation/dto/user.dto';
import { ICategory } from '../../domain/interface/category.interface';
import { CategoryDto } from './category.dto';

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

  @Field(() => Int)
  ownerId: number;

  @Field(() => CategoryDto)
  category: CategoryDto;
}
