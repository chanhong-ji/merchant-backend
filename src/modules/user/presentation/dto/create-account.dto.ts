import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { ICreateAccountInput } from '../../application/dto/create-account.dto';
import { UserDto } from './user.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class CreateAccountInput
  extends PickType(UserDto, ['email', 'password', 'role'], InputType)
  implements ICreateAccountInput {}

@ObjectType()
export class CreateAccountOutput extends BaseOutput {
  @Field(() => Int, { description: '생성된 유저 아이디' })
  userId: number;
}
