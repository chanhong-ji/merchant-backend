import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/merchant.dto';
import { IUser } from '../../domain/interface/user.interface';
import { UserRole } from '../../domain/user-role.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

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

  @Field(() => [MerchantDto])
  merchants: MerchantDto[];
}
