import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IUser } from '../domain/user.interface';
import { UserRole } from '../domain/user-role.enum';
import { MerchantDto } from 'src/modules/merchant/presentation/dto/merchant.dto';

@ObjectType()
@InputType({ isAbstract: true })
export class UserDto implements IUser {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => String)
  address: string;

  @Field(() => String)
  dongCode?: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [MerchantDto])
  merchants: MerchantDto[];
}
