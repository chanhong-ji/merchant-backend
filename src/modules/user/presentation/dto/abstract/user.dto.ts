import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/abstract/merchant.dto';
import { IUser } from '../../../domain/interface/user.interface';
import { UserRole } from '../../../domain/user-role.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { VerificationDto } from './verification.dto';
import { Order } from 'src/modules/order/domain/entity/order.entity';
import { OrderDto } from 'src/modules/order/presentation/dto/abstract/order.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class UserDto implements IUser {
  @Field(() => Number, { description: '아이디' })
  id: number;

  @Field(() => String, { description: '이메일' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: '비밀번호' })
  @IsString()
  password: string;

  @Field(() => UserRole, { description: '역할' })
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => String, { nullable: true, description: '주소' })
  @IsString()
  address?: string;

  @Field(() => String, { nullable: true, description: '동 코드' })
  @IsString()
  dongCode?: string;

  @Field(() => Boolean, { description: '인증 여부' })
  verified: boolean;

  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;

  @Field(() => [OrderDto], { description: '주문 목록' })
  orders: Order[];

  @Field(() => [OrderDto], { description: '배달 목록' })
  rides: Order[];

  @Field(() => [MerchantDto])
  merchants: MerchantDto[];

  @Field(() => VerificationDto)
  verification?: VerificationDto;
}
