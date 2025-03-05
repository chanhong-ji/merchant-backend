import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IMerchant } from '../../domain/merchant.interface';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/modules/user/presentation/dto/user.dto';

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
  user: UserDto;
}
