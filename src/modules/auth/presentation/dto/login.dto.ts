import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ILoginInput } from '../../application/dto/login.dto';
import { UserDto } from 'src/modules/user/presentation/dto/abstract/user.dto';
import { BaseOutput } from 'src/modules/shared/presentation/dto/base.dto';

@InputType()
export class LoginInput
  extends PickType(UserDto, ['email', 'password'], InputType)
  implements ILoginInput {}

@ObjectType()
export class LoginOutput extends BaseOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
