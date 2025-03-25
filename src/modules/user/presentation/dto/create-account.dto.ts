import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { ICreateUserInput } from '../../application/dto/create-account.dto';
import { UserDto } from './abstract/user.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class CreateUserInput
  extends PickType(UserDto, ['email', 'password', 'role'], InputType)
  implements ICreateUserInput {}

@ObjectType()
export class CreateUserOutput extends BaseOutput {
  @Field(() => Int, { description: '생성된 유저 아이디' })
  userId: number;
}
