import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import {
  IFindProfileInput,
  IFindProfileOutput,
} from '../../application/dto/find-profile.dto';
import { IsInt } from 'class-validator';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';
import { UserDto } from './user.dto';

@InputType()
export class FindProfileInput implements IFindProfileInput {
  @Field(() => Int, { description: '유저 아이디' })
  @IsInt()
  userId: number;
}

@ObjectType()
class ProfileUser extends PickType(
  UserDto,
  ['email', 'role', 'address', 'dongCode', 'verified'],
  ArgsType,
) {}

@ObjectType()
export class FindProfileOutput
  extends BaseOutput
  implements IFindProfileOutput
{
  @Field(() => ProfileUser, { nullable: true })
  user?: ProfileUser;
}
